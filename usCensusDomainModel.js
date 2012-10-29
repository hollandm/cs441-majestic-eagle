/*
 *  usCensusDomainModel.js
 *
 *  A collection of methods for the Domain Knowledge specific to the
 *  US Census Bureau zip code tabulation area data.  These methods are all 
 *  centralized in this location instead of diffused throughout the application 
 *  so that one can reason about this D.K. more easily.
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


cs441GoogleMapsViz.zctas = {
	"AK" : 2,
	"AZ" : 4,
	"CA" : 6,
	"CO" : 8,
	"HI" : 15,
	"ID" : 16,
	"IL" : 17,
	"ME" : 23,
	"MN" : 27,
	"NE" : 31,
	"NM" : 35,
	"NV" : 32,
	"NY" : 36,
	"OR" : 41,
	"TX" : 48,
	"UT" : 49,
	"WA" : 53,
};


/*
 * convertStateToUSBNumber
 *
 * Convert a two-letter state abbreviation to the corresponding US Census
 * Bureau state number.  Based on the numbering used in the original
 * .shp files downloaded from 
 * http://www.census.gov/cgi-bin/geo/shapefiles2010/layers.cgi
 *
 * @param state A two-letter state abbreviation.
 * @return number The corresponding US Census bureau state number.
 */
cs441GoogleMapsViz.convertStateToUSBNumber = function(state) {

	return cs441GoogleMapsViz.zctas[state];
	
};
	
