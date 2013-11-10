//TODO: Sherry please update this.
/*
 *  filter.js
 *
 *  A filter object.
 * 
 *  @author Sherry Liao
 */

/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */

var cs441GoogleMapViz = cs441GoogleMapsViz || {};


//TODO: remove this reference code.
// cs441GoogleMapsViz.filter = function(name, input, status){
	// this.name = name;
	// this.isActive = status;
// };


cs441GoogleMapsViz.quantitativeFilter = function(name, status){
	this.name = name;
	this.input = "";
	this.min = "";
	this.max = "";
	this.isActive = status;
};


cs441GoogleMapsViz.categoricalFilter = function(name, status){
	this.name = name;
	this.input = "";
	this.items = [];
	this.isActive = status;
};


/**
 * generateFiltersString
 * 
 * generates a string to append to a fusion query to filter the results with the filters the 
 * 		user has selected
 * 
 * The output query section will filter out all students who have not given us their High School. (No ceeb attached)
 * 
 * @returns the filter section of the query string
 */
cs441GoogleMapsViz.generateFiltersString = function() {

	var filterString = " WHERE";
	
	
	//generate the string to query only high schools with the given names
	var hsFilterString = cs441GoogleMapsViz.generateHighschoolFiltersString();
	
	//if we arn't filtering by a ceeb then tell it to only get info about students who have given us their high school
	// aka they have a HighSchoolCode associated with them
	if (hsFilterString === "") {
		filterString += " HighSchoolCode > 0";
	} else {
		filterString += hsFilterString;
	}
	
	//Major Filter
	var majorFilterString = cs441GoogleMapsViz.generateMajorFiltersString(); 
	if (majorFilterString != "") {
		filterString += " AND " + majorFilterString;
	}
	
	
	//TODO: GPA Filter
	var gpaFilterString = cs441GoogleMapsViz.generateGPAFiltersString(); 
	
	if (cs441GoogleMapsViz.filterList["GPA"].isActive) {
		filterString += " AND " + gpaFilterString;
	}
	
	//TODO: SAT Filter
	
	var satFilterString = cs441GoogleMapsViz.generateSATFiltersString(); 
	if (cs441GoogleMapsViz.filterList["SAT"].isActive) {
		filterString += " AND " + satFilterString;
	}
	// console.log(filterString)
	
	return filterString;
};


/*
 * generateHighschoolFiltersString
 * 
 * This function will generate a string which will be part of a fusion query
 * It's part of the query instucts the databse to only return student info of the students
 * who attened one of the high schools listen by our filters
 * 
 * If the High School filter is not active or no high schools names match the input
 * then this function will return an empty string  ("")
 * 
 * @returns the high school section of the query string
 */
cs441GoogleMapsViz.generateHighschoolFiltersString = function() {
	
	var hsFilter = cs441GoogleMapsViz.filterList["High School"];
	if (hsFilter.isActive) {
		
		var found = [];
		
		//for every high school in our database
		for (ceeb in cs441GoogleMapsViz.highSchools) {
			
			//and every high school we are filtering by
			for (index in hsFilter.items) {
				var hsName = hsFilter.items[index].toUpperCase();
				
				//check if they are the same
				if (cs441GoogleMapsViz.highSchools[ceeb].name.toUpperCase() == hsName) {
				
					// and if they are add them to our list of accepted high schools
					found.push(ceeb);
				
				}
			}
			
		}
		
		// if we have at leat one high school in our list
		if (found.length > 0) {
			return" HighSchoolCode IN (" + found.toString() + ")";
		} else {
			alert("None of the given high schools could been found");
			return" HighSchoolCode = -1";
		}
	} 
	return "";
};



/*
 * generateMajorFiltersString
 * 
 * This function will generate a string which will be part of a fusion query
 * It's part of the query instucts the databse to only return student info of the students
 * who are one of the majors specified
 * 
 * If the Major filter is not active or no major names match the input
 * then this function will return an empty string  ("")
 * 
 * @returns the major section of the query string
 */
cs441GoogleMapsViz.generateMajorFiltersString = function() {
	
	var majorFilter = cs441GoogleMapsViz.filterList["Major"];
	if (majorFilter.isActive) {
		
		var found = [];
		
		//for every high school in our database
		for (major in cs441GoogleMapsViz.majorCodes) {
			
			//and every high school we are filtering by
			for (index in majorFilter.items) {
				var majorName = majorFilter.items[index];
				
				//check if they are the same
				if (major.toUpperCase() == majorName.toUpperCase()) {
				
					// and if they are add them to our list of accepted high schools
					found.push(cs441GoogleMapsViz.majorCodes[major]);
				
				}
			}
			
		}
		
		// if we have at leat one high school in our list
		if (found.length > 0) {
			return" Planned_Major_Code IN (" + found.toString() + ")";
		} else {
			alert("None of the given majors exist");
			return" Planned_Major_Code = -1";
		}
	} 
	
	return "";
};


/*
 * generateGPAFiltersString
 * 
 * This function will generate a string which will be part of a fusion query
 * It's part of the query instucts the databse to only return student info of the students
 * who are in one of the ranges specified
 * 
 * If the GPA filter is not active then this function will return an empty string  ("")
 * 
 * @returns the gpa section of the query string
 */
cs441GoogleMapsViz.generateGPAFiltersString = function() {
	return cs441GoogleMapsViz.generateNumericFiltersString("GPA", "HS_GPA",0.01);
};

/*
 * generateSATFiltersString
 * 
 * This function will generate a string which will be part of a fusion query
 * It's part of the query instucts the databse to only return student info of the students
 * who are in one of the ranges specified
 * 
 * If the GPA filter is not active then this function will return an empty string  ("")
 * 
 * @returns the sat section of the query string
 */
cs441GoogleMapsViz.generateSATFiltersString = function() {
	return cs441GoogleMapsViz.generateNumericFiltersString("SAT", "SAT_SUM",10);
};



/*
 * generateNumericFiltersString
 * 
 * This function will generate a string which will be part of a fusion query
 * It's part of the query instucts the databse to only return student info of the students
 * who are in one of the ranges specified
 * 
 * If the given filter is not active then this function will return an empty string  ("")
 * 
 * @param filterName: The string index of the filter
 * @param databaseColumName: The name of the colum in the database that we will be referencing
 * @param increment: is the amount that numbers change from one index to another
 * 
 * @returns the section of the query string
 */
cs441GoogleMapsViz.generateNumericFiltersString = function(filterName, databaseColumName, increment) {
	
	var gpaFilter = cs441GoogleMapsViz.filterList[filterName];
	if (gpaFilter.isActive) {
		
		var rangeString = databaseColumName + " IN (";
		
		for (i in gpaFilter.ranges) {
			var r = gpaFilter.ranges[i];
			
			rangeString += r[0];
			
			var max = parseFloat(r[1]);
			
			//As far as I can tell fusion tables don't support having a number in one range or a different range
			//To counter this I have used the IN command. I am checking if it is any number between min and max
			//by listing out every possible number between min and max
			
			//TODO: Find a less stupid way to do this...
			var inc = parseFloat(r[0]) + increment;
			for (; inc <= max; inc += increment) {
				rangeString += ","+Number((inc).toFixed(2));
				
			}
			
		}
		
		//console.log(rangeString);
		return rangeString + ")";

		
	} 
	
	return "";
};

