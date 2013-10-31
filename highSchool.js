/**
 * highSchool.js
 *
 * This file contains code to fetch and store the high school data.
 *  
 * @author Matt Holland and Taylor W. Nightingale
 * @since October 27th, 2013
 */

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

/**
 * highSchool
 * This object models a high school and how it is displayed.
 * The object has several "static" attributes that should not change
 * over the life of the object:
 * 		-ceeb  : The number which maps to a high school (int)
 * 		-name  : The name of the high school (string)
 * 		-state : An acronmym for a state in the United States of America
 * 				 e.g. "OR", "MI", "WA" (string)
 * 
 * The other attributes will by "dynamic" in that they will change over
 * the life of the object. These will change based on the current filters:
 * 		-applied  : The number of students who meet 
 * 					the current filters and have applied (int)
 * 		-accepted : The number of students who meet 
 * 					the current filters and have accepted (int)
 * 		-enrolled : The number of students who meet 
 * 					the current filters and have enrolled (int)
 * 		-inquired : The number of students who meet 
 * 					the current filters and have inquired (int)
 * 		-avgGpa   : The mean GPA of students who meet the
 * 					current filters (double)
 * 		-avgSat   : The mean SAT (reading and math combined) of
 * 					students who meet the current filters (int)
 * 		-students : The total number of students who meet the current filter criteria (int)
 * 		-isActive : Whether or not the high school will be shown. This value 
 *  				will be false if 'students' is 0 or if it is being filtered out
 * 					by the 'highSchool' filter (boolean)
 * 
 */
cs441GoogleMapsViz.highSchool = function(ceeb, name, state, latitude, longatude) {
	
	this.ceeb = ceeb;
	this.name = name;
	this.state = state;
	this.lat = latitude;
	this.lng = longatude;

	this.applied = 0;
	this.accepted = 0;
	this.enrolled = 0;
	this.inquired = 0;
	
	this.avgGpa = 0;
	this.avgSat = 0;
	
	this.students = 0;
	this.isActive = true;

};
