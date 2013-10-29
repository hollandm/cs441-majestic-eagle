/*
 *  admissionsDomainModel.js
 *
 *  A collection of methods for the Domain Knowledge specific to the
 *  Admissions Unit.  These methods are all centralized in this location
 *  instead of diffused throughout the application so that one can
 *  reason about this D.K. more easily.
 *
 *  @author Tanya L. Crenshaw
 */

/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

/*
 * regions
 *
 * An object that represents all of the region assignments in the
 * Admissions Unit.  Each property is a region name.  Each value
 * of each property is an array.  The first element of the array
 * is the two-letter state abbreviation associated with the region.
 * The remainder of the array is any subregions for the region.
 * 
 * TODO: Incomplete list.  I don't feel, either, that this is the
 * best way to organize this data.  
 */
cs441GoogleMapsViz.regions = {
	"Alaska" : ["AK"],
	"Arizona" : ["AZ"],
    "Californa" : ["CA"],
	"Colorado" : ["CO"],
	"Hawaii" : ["HI"],
    "Idaho" : ["ID"],
	"Illinois" : ["IL"],
	"Maine" : ["ME"],
	"Minnesota" : ["MN"],
	"Nebraska" : ["NE"],
	"New Mexico" : ["NM"],
	"New York" : ["NY"],
	"North Nevada - Reno" : ["NV"],
	"South Nevada - Las Vegas" : ["NV"],
	"Oregon" : ["OR", "Salem", "Corvallis", "Eugene"],
	"Portland" : ["OR", "Area1", "Catholic1", "Catholic2", "Area2", "Area3", "Area4", "North Coast"],
	"Texas" : ["TX"],
	"Utah" : ["UT"],
	"Washington" : ["WA"]

};

/*
 * getRegions
 *
 * Based on the "Counselor Assignments" provided by Jason McDonald, this
 * method supplies an array of all of the Region Names for the Admissions
 * Unit, as group by counselor.
 *
 * TODO: TLC.  Currently, this is only a partial list, as I am doing a
 * proof of concept with regards to drop-down menus.  I need to finish
 * enumerating all the regions.
 *
 * @param none
 * @return regions An object containing each region as a property and
 * an array of all subregions as the value of each property.
 *
 */
cs441GoogleMapsViz.getRegions = function() {

	return cs441GoogleMapsViz.regions;
};
/*
 * convertRegionToState
 *
 * Convert the possible menu choices available to a two-letter
 * state abbreviation.
 *
 * @param menuChoice A user-supplied menu choice extracted from an HTML
 * element.
 * @return state A two-letter state abbreviation.
 */
cs441GoogleMapsViz.convertRegionToState = function(region) {

	var state = cs441GoogleMapsViz.regions[region][0];

	return state;

}