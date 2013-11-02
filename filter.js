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
	
	//TODO: Major Filter
	
	//TODO: GPA Filter
	if (cs441GoogleMapsViz.filterList["GPA"].isActive) {
		console.log(cs441GoogleMapsViz.filterList);
		
		var gpa = cs441GoogleMapsViz.filterList["GPA"].input;
		
		console.log(gpa);
		
	}
	
	//TODO: SAT Filter
	
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
				var hsName = hsFilter.items[index];
				
				//check if they are the same
				if (cs441GoogleMapsViz.highSchools[ceeb].name == hsName) {
				
					// and if they are add them to our list of accepted high schools
					found.push(ceeb);
				
				}
			}
			
		}
		
		// if we have at leat one high school in our list
		if (found.length > 0) {
			return" HighSchoolCode IN (" + found.toString() + ")";
		}
		
	} 
	
	return "";
};
