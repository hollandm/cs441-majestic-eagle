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

// cs441GoogleMapsViz.filter = function(name, input, status){
	// this.name = name;
	// this.isActive = status;
// };


cs441GoogleMapsViz.quantitativeFilter = function(name, status){
	this.name = name;
	this.min = "";
	this.max = "";
	this.isActive = status;
};


cs441GoogleMapsViz.categoricalFilter = function(name, status){
	this.name = name;
	this.input = "";	
	this.isActive = status;
};
