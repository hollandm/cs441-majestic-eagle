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
	
	var items = filter.input.toUpperCase().split(",");
	for (i in items) {
		items[i] = items[i].trim();
	}
	
	filter.items = items;
	
};

