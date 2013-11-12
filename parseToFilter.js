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

/**
 * parseToNumericFilter
 * 
 * This method uses the input from the given filter parses it to set the populate the items array
 * 
 * Parse Rules:
 * 	1. a , (comma) will be used to seperate multiple enteries. Therefor we can have a list
 * 		Example: A, B, C will result in a filter that accepts A or B or C
 * 
 * 	Precondition: the filter has a valid non-empty input
 * 
 * @param filter: the filter object to update
 * 
 */
cs441GoogleMapsViz.parseToNumericFilter = function(filter) {
	
	var item = filter.input.split(",");
	var ranges = [];
	
	
	for (i in item) {
		// item[i] = item[i].trim();
		
		var range = item[i].split("-");
		
		if (range.length == 1) {
			ranges[i] = [range[0], range[0]];
		} else if (range.length == 2) {
			ranges[i] = [range[0], range[1]];
		} else {
			//It is an invalid string, do something maybe?
		}
		
		
	}
	
	filter.ranges = ranges;
	
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
	if(filterType == "GPA") {
		// Make sure the input is an arbitrary amount 
		// of ranges or a single number delimitted by a comma.
		// Where each range can be a positive double or 
		// integer from 0.0 to 4.0 (or 0 - 4 or 0.0 - 4, etc...).
		var pattern = new RegExp("^\\s*[0-9]*\\.?[0-9]+\\s*(-\\s*[0-9]*\\.?[0-9]+\\s*)?(,\\s*[0-9]*\\.?[0-9]+\\s*(-\\s*[0-9]*\\.?[0-9]+\\s*)?)*$");
		if(pattern.test(filterInput)) {
			return true;	
		}
		else {
			return false;
		}
	}
	else if(filterType == "SAT") {
		// Make sure the input is an arbitrary amount 
		// of ranges. Where each range consists of two whole numbers.
		var pattern = new RegExp("^\\s*[0-9]+\\s*(-\\s*[0-9]*\\s*)?(,\\s*[0-9]*\\s*(-\\s*[0-9]*\\.?[0-9]+\\s*)?)*$");
		if(pattern.test(filterInput)) {
			return true;	
		}
		else {
			return false;
		}
	}
	else if(filterType == "Major" || filterType == "High School") {
		return true;
	}
	else { 
		alert("Invalid filter type."); 
		return false;
	}
};
