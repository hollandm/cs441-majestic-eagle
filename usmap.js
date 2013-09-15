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
 * cs441GoogleMapsViz.getCEEB()
 *
 * This function gets the ceeb from the page, as entered by
 * the user in the input textbox with id "ceeb".
 *
 * @param void
 * @return The value of the html element with id "ceeb"
 */
cs441GoogleMapsViz.getCEEB = function() {

	return document.getElementById("ceeb").value;
};
/*
 * cs441GoogleMapsViz.getHighSchool()
 *
 * This function gets the high school from the page, as entered by
 * the user in the input textbox with id "highschool".
 *
 * @param void
 * @return The value of the html element with id "highschool"
 */
cs441GoogleMapsViz.getHighSchool = function() {

	return document.getElementById("highschool").value;
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
 *  according to the CEEB grabbed from the page (that is,
 * 	entered by the user) and recenters the layer's map at the zipcode
 *  associated with the given CEEB.
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

	// Get the CEEB code from the page, as entered by the user.
	var ceeb = cs441GoogleMapsViz.getCEEB();
	
	// Did the user type anything?
	if(ceeb == "")
	{
		// Give an error message to the user:
		document.getElementById("message").innerHTML = "Error: Please enter a CEEB";
	}
	
	// Did the user enter the CEEB?  
	else
	{
		// Clear any error message.
		document.getElementById("message").innerHTML = "";
		
		// Get the corresponding zipcode for this CEEB.  The zipcode for this
		// CEEB is contained in the same row as the CEEB in the Google Fusion
		// tables.  So, I need to get the Zip in the row whose 'Code' is
		// the CEEB entered by the user.  This is done using the GET API
		// specified in the Google Fusion Tables Developer documentation.
		
		// Step 1. Create a url for
		// a subsequent GET request to a Google server.
		var apikey = 'AIzaSyBi-AAi-4lbdMhWHY1kv8o9QDX8vAcOFeM';
		
		var query = "SELECT 'Zip' FROM " +
            layerArray[1].eID + " WHERE Code = " + ceeb;
		
		var url = "https://www.googleapis.com/fusiontables/v1/query";
		url = url + "?sql=";
		url = url + query;
		url = url + " &key=" + apikey;
		
		var httpRequest;
		var zipcode;
	
		// Send the GET Request to the Google Server
		makeRequest(url);

		// The following GET request code is adapted from: 
		// https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
		function makeRequest(url) {
			if(window.XMLHttpRequest) {// Mozilla, Safari, ...
				httpRequest = new XMLHttpRequest();
			} else if(window.ActiveXObject) {// IE
				try {
					httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {
					}
				}
			}

			if(!httpRequest) {
				alert('Cannot contact Google server');
				return false;
			}
            
			httpRequest.onreadystatechange = alertContents;
			httpRequest.open('GET', url);
			httpRequest.send();
		
			function alertContents() {
				if(httpRequest.readyState === 4) {
					if(httpRequest.status === 200) {

						// The code reaches this point because the Google server
						// responded with some useful data.
						console.log(httpRequest.responseText);
						
						// The response is just a string.  I need
						// to parse it so that I can extract the zip code from it.
						var response = JSON.parse(httpRequest.responseText);
						
						if(response["rows"] != undefined)	
						{				
							// Set 	the zoom.
							layerArray[0].map.setZoom(11);

							// Center the map.
							centerAt(layerArray[0].map, response["rows"][0].toString(), geocoder);
							
							// Filter the school layer by CEEB.
							cs441GoogleMapsViz.filterByCEEB.call(layerArray[1], ceeb);
						}
						else
						{
							// Indicate to the user that I could not find that
							// CEEB.
							document.getElementById("message").innerHTML = "Cannot locate CEEB: " + ceeb + ".";
						}
						
					} else {
						alert('There was a problem with the request.');
					}
				}
			}			
		}				
	}	
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

	// Encrypted IDs for the Google Fusion Table containing the
	// Oregon high school and CEEB data.
	var schoolEID = '1TysRKf1siV396AMbUKmi8w2-XB3Zeye2ObXjl8Y';	

	// The Encrypted ID used below is that of tl_2010_41_zcta051_clean.kml
	// available in Tanya Crenshaw's public fusion tables.
	var zipEID = '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU';


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
	var zipLayer = new cs441GoogleMapsViz.Layer("zips", new google.maps.FusionTablesLayer({
		query : {
			from : zipEID
		}
	}), zipEID, map, 'ZipCodeArea', false);

	// Create a Layer object for the high schools layer.  The first parameter
	// creates the Google FusionTablesLayer object.  The Layer is not currently being
	// filtered, so the final parameter is false.
	var schoolLayer = new cs441GoogleMapsViz.Layer("schools", new google.maps.FusionTablesLayer({
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
