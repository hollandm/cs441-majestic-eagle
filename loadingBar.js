/**
 * databases.js
 * 
 * This file contains code for the project to reference and access the databases 
 * 
 * @author Matt Holland
 * @since November 11th, 2013
 */


/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapViz = cs441GoogleMapsViz || {};


/**
 * showLoadingBar
 * 
 * This function will inticate to the user by dispalying a bar on the top of the screen,
 * that the program is loading high school information
 * 
 */
cs441GoogleMapsViz.showLoadingBar = function() {
	var loadingBar = document.getElementById("loading");

	loadingBar.setAttribute("class","loading-visible");

}

/**
 * hideLoadingBar
 * 
 * This function will hide the loading inticater on the top of the screen
 * 
 */
cs441GoogleMapsViz.hideLoadingBar = function() {

	var loadingBar = document.getElementById("loading");
	
	loadingBar.setAttribute("class","loading-hidden");
	
}