/**
 * parseToFilter.js
 * 
 * This file contains methods to parse input from our filter input box
 * and create a filter object from that
 * 
 * @author Matt Holland
 * @since November 1st, 2013
 */


/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapViz = cs441GoogleMapsViz || {};



/**
 * parseToCatagoricFilter
 * 
 * This method uses the input from the given filter parses it to set the populate the items array
 * 
 * Parse Rules:
 * 	1. a , (comma) will be used to seperate multiple enteries. Therefor we can have a list
 * 		Example: A, B, C will result in a filter that accepts A or B or C
 * 
 * @param filter: the filter object to update
 * 
 */
cs441GoogleMapsViz.parseToCatagoricalFilter = function(filter) {
	
	var items = filter.input.split(",");
	for (i in items) {
		items[i] = items[i].trim();
	}
	
	filter.items = items;
	
};

/*
 * isInputValid
 * 
 * This function will determine the validity of input. That is, if the 
 * passed in string matches the type of filter, it will accept. Note, this
 * function will not check to see if the input exists in our database. Only if
 * the query has the correct syntax.
 * 
 * @param filterType Determines the type of valid strings
 * @param filterInput The string to have its validity checked
 */
cs441GoogleMapsViz.isInputValid = function(filterType, filterInput) {
	
	if(filterType == "High School") {
		// All 
		//TODO: Check for multiple high schools
		return true;
	}
	else if(filterType == "GPA") {
		// Make sure the input is an arbitrary amount 
		// of ranges or a single number. Where each range 
		// can be a positive double or an integer from 
		// 0.0 to 4.0.
		// i.e. w.x - y.z where w.x <= y.z
		return true;
	}
	else if(filterType == "SAT") {
		// Make sure the input is an arbitrary amount 
		// of ranges. Where each range consists of two whole numbers.
		// These numbers must be in the range of 0 to 1600.
		return true;
	}
	else if(filterType == "Major") {
		// Make sure the input is a list of majors.
		// These majors will be comman delimited.
		// These majors must exist.
		return true;
	}
	else { 
		alert("Invalid filter type."); 
		return false;
	}
};

