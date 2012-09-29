/*
 *  usmap.js
 *
 *  @author Tanya L. Crenshaw
 */

/* Define the global namespace and setup all the listners for the main
 * page.  Scroll to the bottom to see listeners get setup.
 */
var cs441GoogleMapsViz = {};

/*
 * cs441GoogleMapsViz.addEvent()
 *
 * A utility function adapted from Google Code university to
 * simplify the browser-dependent act of adding events to
 * html elements.  Given an element, an event, and a function
 * this function checks the browser capability, and uses the
 * correct "add listener" or "attach event" function to
 * bind the function to the event for the element.
 *
 * @param el The html element.
 * @param evt A string representing the event.  e.g. 'click'
 * @param fn The function that will be invoked when the given
 * event 'evt' is experienced by the given element 'el'.
 *
 * @return void
 */
cs441GoogleMapsViz.addEvent = function(el, evt, fn) {
	if(el.addEventListener) {
		el.addEventListener(evt, fn, false);
	} else if(el.attachEvent) {
		el.attachEvent('on' + evt, fn);
	}
};
/* cs441GoogleMapsViz.forEach()
 *
 * A utility function adopted from "Eloquent JavaScript" that
 * accepts an action and applies that action to each element in
 * an array.  This helps to abstract the tedium of for-loops.
 *
 * @param array The array of elements to operate upon.
 * @param action The action to perform on each element.
 *
 * @return void
 */
cs441GoogleMapsViz.forEach = function(array, action) {

	for(var i = 0; i < array.length; i++) {
		action(array[i]);
	}

};
/*
 * cs441GoogleMapsViz.getZip()
 *
 * This function gets the zipcode from the page, as entered by
 * the user in the input textbox with id "zipcode".
 *
 * @param void
 * @return The value of the html element with id "zipcode"
 */
cs441GoogleMapsViz.getZip = function() {
	// TLC TODO: Use the memoization pattern so that the
	// zipcode element only has to be grabbed once.
	return document.getElementById("zipcode").value;
};
/*
 *  cs441GoogleMapsViz.lookup()
 *
 *  For an array of layers, this function filters the layers
 *  according to the zipcode grabbed from the page (that is,
 * 	entered by the user) and recenters the layer's map at the zipcode.
 *
 *  This function assumes that all the layers are on the same map.
 *  Thus, when resetting the zoom and recentering the map, these
 *  operations are done only once on the first layer.
 *
 *  @param layerArray An array of Google FusionTableLayers.
 *  @param geocoder The geocoder service to use to recenter the map.
 *  @return void
 */
cs441GoogleMapsViz.lookup = function(layerArray, geocoder) {

	// Get the zip code from the page, as entered by the user.
	var zip = cs441GoogleMapsViz.getZip();

	// Filter each layer by the zip.
	cs441GoogleMapsViz.forEach(layerArray, function(t) {
		filterByZip.call(t, zip);
	});
	// Set the zoom for each layer.
	layerArray[0].map.setZoom(11);

	// Center the map for each layer.
	centerAt(layerArray[0].map, zip, geocoder);
}
/*
 *  cs441GoogleMapsViz.toggle()
 *
 *  @param layerArray An array of Layer objects to toggle.
 *  @return void
 */
cs441GoogleMapsViz.toggle = function(layerArray) {

	// Get the zip code from the page, as entered by the user.
	var zip = cs441GoogleMapsViz.getZip();

	// Toggle each layer by the zip.
	cs441GoogleMapsViz.forEach(layerArray, function(t) {
		toggleLayer.call(t, zip);
	});
}
/*
 *  cs441GoogleMapsViz.initialize()
 *
 *  A function to: 1. create a google map centered at the us and
 *  2: instantiate a google maps geocoder service.  Note that the
 *  variables geocoder and map are not declared using var -- this
 *  is so that they can be written to the window object and used by
 *  other functions.
 *
 *  @param void
 *  @return void
 */
cs441GoogleMapsViz.initialize = function() {

	// Encrypted IDs for the two layers

	// The Encrypted ID used below is that of tl_2010_41_zcta051_clean.kml
	// available in Tanya Crenshaw's public fusion tables.
	var zipEID = '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU';

	// The Encrypted ID used below is that of
	// OregonHighSchools_withManualFusionTableFixes.csv available
	// in Tanya Crenshaw's public fusion tables.
	var schoolEID = '1YcgR53xYb2OQm77NNyYfMh7-nwkrtZxoig7U_ms';

	// Instatiate a new geocoder service
	var geocoder = new google.maps.Geocoder();

	// The center point of the map is Lincoln, NB.
	var usa = new google.maps.LatLng(40.8358, -96.6452);

	// Create a Google Map object centered at usa
	var map = new google.maps.Map(document.getElementById("contig_us_map_canvas"), {
		zoom : 4,
		center : usa,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	// Create a Layer object for the zip code boundary layer.  The first parameter
	// creates the Google FusionTablesLayer object.  The Layer is not currently being
	// filtered, so the final parameter is false.
	var zipLayer = new Layer(new google.maps.FusionTablesLayer({
		query : {
			from : zipEID
		}
	}), zipEID, map, 'ZipCodeArea', false);

	// Create a Layer object for the high schools layer.  The first parameter
	// creates the Google FusionTablesLayer object.  The Layer is not currently being
	// filtered, so the final parameter is false.
	var schoolLayer = new Layer(new google.maps.FusionTablesLayer({
		query : {
			from : schoolEID
		}
	}), schoolEID, map, 'Zip', false);

	// Create an array of Layers
	var layerArray = new Array();
	layerArray.push(zipLayer);
	layerArray.push(schoolLayer);

	// Add a listener to the layer.  When the user clicks on the
	// particular zip code area in the layer, some information
	// about the particular zip code is displayed in the info portion
	// of the page.
	google.maps.event.addListener(zipLayer.ref, 'click', function(displayedArea) {

		// Get the necessary information from the clicked area
		var information = displayedArea.row['ZipCodeArea'].value + "<br>";

		// Format and display it in the information window for the displayed area.
		formatInfoWindow(displayedArea, information)
	});
	// Attach the function lookup() to the lookupButton on the main page.
	cs441GoogleMapsViz.addEvent(document.getElementById('lookupButton'), 'click', function() {
		return cs441GoogleMapsViz.lookup(layerArray, geocoder);
	});
	// Attach the function toggleLayers() to the toggleButton on the main page.
	cs441GoogleMapsViz.addEvent(document.getElementById('toggleButton'), 'click', function() {
		return cs441GoogleMapsViz.toggle(layerArray);
	});
}
// Setup an event listener to execute the init() function for this namespace
// upon page load.
google.maps.event.addDomListener(window, 'load', cs441GoogleMapsViz.initialize);
