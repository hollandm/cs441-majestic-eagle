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
 * filters
 *
 * An object that represents all of the unadded filters.
 * TODO: Add more documentation to this 
 * 
 * TODO: Incorporate this with the current selected filters
 */
cs441GoogleMapsViz.filters = {
	"GPA": ["GPA"], 
	"High School": ["HS"], 
	"Declared Major": ["Major"], 
	"SAT (Math and Reading)": ["SAT"]
};


cs441GoogleMapsViz.selectedFilters = {
	
};

cs441GoogleMapsViz.getSelectedFilters = function(){
	return cs441GoogleMapsViz.selectedFilters;
};

/*
 * addFilter
 * 
 * Adds a filter to the selectedFilters list and removes the filter from
 * the list of filters available in drop down list
 */
cs441GoogleMapsViz.addFilter = function(filterType, filterID){
	delete cs441GoogleMapsViz.filters[filterType];
	cs441GoogleMapsViz.selectedFilters[filterType] = [filterID]; 
};


/*TODO: Make this return a dynamic list based on what filters have not been selected
 * getFilters
 *
 * This supplies a list of the current valid filters that can be applied.
 * That is, any filter which has not already been added.
 *
 * @param none
 * @return filters An object containing each filter as a string
 *
 */
cs441GoogleMapsViz.getFilters = function() {
	return cs441GoogleMapsViz.filters;
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

};