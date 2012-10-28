/*
 *  usmap.js
 * 
 *  This file has these main responsibilities:
 *  1. Initialize the main page, index.html.
 *  2. Setup all the listners for the main page.  
 *  3. Grab values of HTML elements for other parts of the application.
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
 * cs441GoogleMapsViz.getZip()
 *
 * This function gets the zipcode from the page, as entered by
 * the user in the input textbox with id "zipcode".
 *
 * @param void
 * @return The value of the html element with id "zipcode"
 */
cs441GoogleMapsViz.getZip = function() {

	return document.getElementById("zipcode").value;
};
/*
 * cs441GoogleMapsViz.getRegion()
 *
 * This function gets the region from the page, as entered by
 * the user in the select input element with id "regionFilterMenu."
 *
 * @param void
 * @return The value of the html element with id "regionFilterMenu"
 */
cs441GoogleMapsViz.getRegion = function() {

	return document.getElementById("regionFilterMenu").value;
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
		cs441GoogleMapsViz.filterByZip.call(t, zip);
	});
	
	// Set the zoom.
	layerArray[0].map.setZoom(11);

	// Center the map.
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
		cs441GoogleMapsViz.toggleLayer.call(t, zip);
	});
}
/*
 *  cs441GoogleMapsViz.regionalize()
 * 
 *  This function filters an array of layer objects based on the
 *  region name grabbed from the page (that is, entered by the user)
 *  and recenters the map at the region.
 *
 *  @param layerArray An array of Layer objects to regionalize.
 *  @param geocoder The geocoder service to use to recenter the map.
 *  @return void
 */
cs441GoogleMapsViz.regionalize = function(layerArray, geocoder) {

	// Get the region name from the page, as entered by the user.
	var region = cs441GoogleMapsViz.getRegion();
	
	// Filter each layer by the region.
	cs441GoogleMapsViz.forEach(layerArray, function(t) {
		cs441GoogleMapsViz.filterByRegion.call(t, region);
	});
	
		// Set the zoom.
	layerArray[0].map.setZoom(6);
	
	// Center the map at the state corresponding to the region.
	centerAt(layerArray[0].map, cs441GoogleMapsViz.convertRegionToState(region), geocoder);
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
	//
	//	Constructing the layers
	//
	// Create a Layer object for the zip code boundary layer.  The first parameter
	// creates the Google FusionTablesLayer object.  The Layer is not currently being
	// filtered, so the final parameter is false.
	var zipLayer = new cs441GoogleMapsViz.Layer("zip", new google.maps.FusionTablesLayer({
		query : {
			from : zipEID
		}
	}), zipEID, map, 'ZipCodeArea', false);

	// Create a Layer object for the high schools layer.  The first parameter
	// creates the Google FusionTablesLayer object.  The Layer is not currently being
	// filtered, so the final parameter is false.
	var schoolLayer = new cs441GoogleMapsViz.Layer("school", new google.maps.FusionTablesLayer({
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
		cs441GoogleMapsViz.formatInfoWindow(displayedArea, information)
	});
	// Attach the function lookup() to the lookupButton on the main page.
	cs441GoogleMapsViz.addEvent(document.getElementById('lookupButton'), 'click', function() {
		return cs441GoogleMapsViz.lookup(layerArray, geocoder);
	});
	// Attach the function toggleLayers() to the toggleButton on the main page.
	cs441GoogleMapsViz.addEvent(document.getElementById('toggleButton'), 'click', function() {
		return cs441GoogleMapsViz.toggle(layerArray);
	});
	//
	// Constructing the Filter Menus
	//
	// Create the Region Filtering menu
	// Connect the filter menu to the "regionFilterPanel" that is on the index.html page.
	// Get the menu options from the admissions domain model method, getRegions().
	// Attach the method filter() to the menu such that whenever the menu changes,
	// the filter() method is called.
	var regionFilterMenu = new cs441GoogleMapsViz.FilterMenu("regionFilterMenu", "regionFilterMenu", "filterMenu", "regionFilterPanel", cs441GoogleMapsViz.getRegions(), function() {
		return cs441GoogleMapsViz.regionalize(layerArray, geocoder);
	});
	regionFilterMenu.createMenu();

}
// Setup an event listener to execute the init() function for this namespace
// upon page load.
google.maps.event.addDomListener(window, 'load', cs441GoogleMapsViz.initialize);
