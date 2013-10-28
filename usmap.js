/*
 *  usmap.js
 * 
 *  This file has these main responsibilities:
 *  1. Initialize the main page, index.html.
 *  2. Setup all the listeners for the main page.  
 *  3. Grab values of HTML elements for other parts of the application.
 * 
 *  @author Tanya L. Crenshaw, Team PETA-Flops
 */

/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapsViz = cs441GoogleMapsViz || {};


/*
 * cs441GoogleMapsViz.getRegion()
 *
 * This function gets the filter from the page, as entered by
 * the user in the select input element with id "filterMenu."
 *
 * @param void
 * @return The value of the html element with id "filterMenu"
 */
cs441GoogleMapsViz.getMenuOption = function() {
	return "High School"; 
	//TODO: return the following
	//return document.getElementById("filterMenu").value;
};

/*
 * cs441GoogleMapsViz.getFilterInput()
 *
 * This function gets the input from the page, as entered by
 * the user in the text input form with id "inputBox"
 *
 * @param void
 * @return The value of the input element in the "inputBox" form
 */
cs441GoogleMapsViz.getFilterInput = function() {
	return document.getElementById("inputBox").filterInputs.value;
};

/*
 * cs441GoogleMapsViz.selectMenuOption()
 * 
 * This function changes the filter menu shown to the user based on what 
 * is selected in the filterMenu (in other words, the data entered by
 * 	the user). 
 * 
 * @return void
 */
cs441GoogleMapsViz.selectMenuOption = function() {
	var filterToDisplay = cs441GoogleMapsViz.getMenuOption();
	if (filterToDisplay == "High School"){
		document.getElementById("filterInput").value = "hi";
	}
	
	//TODO: Display menu filters here
	
};

/*
 * cs441GoogleMapsViz.getErrorMsgElement()
 *
 * This function gets the element from the page where error messages
 * should be placed.
 *
 * @param void
 * @return The html element with id "errormessage"
 */
cs441GoogleMapsViz.getErrorMsgElement = function() {

	return document.getElementById("errormessage");
};

/*
 *  cs441GoogleMapsViz.makeRequestor()
 *
 *  This function makes an object to make http requests.
 * 
 *  This function is adapted from: 
 *    https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
 * 
 *  This application calls this function only once; it uses only
 *  one httpRequest object to send all subsequent GET requests.
 *
 *  @param void
 *  @return void
 */
cs441GoogleMapsViz.makeRequestor = function() {

	if(window.XMLHttpRequest) {// Mozilla, Safari, ...
		cs441GoogleMapsViz.httpRequest = new XMLHttpRequest();
	} else if(window.ActiveXObject) {// IE
		try {
			cs441GoogleMapsViz.httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				cs441GoogleMapsViz.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}

	if(!cs441GoogleMapsViz.httpRequest) {
		alert('Cannot create http requestor!');
		return false;
	}
};

/*
 *  cs441GoogleMapsViz.sendRequest()
 *
 *  This function utlizes the namespace's httpRequest object to make 
 *  http requests.  It sets up the httpRequest onreadystatechange
 *  property to be the response function passed to this function.
 * 
 *  This function is adapted from: 
 *    https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
 *
 *  @param url The well-formed url representing the http request.
 *  @param response The function describing the behavior that should
 *         occur after the httpRequest object gets a response.
 *  @return void
 */

cs441GoogleMapsViz.sendRequest = function(url, response) {
	
	cs441GoogleMapsViz.httpRequest.onreadystatechange = response;
	cs441GoogleMapsViz.httpRequest.open('GET', url);
	cs441GoogleMapsViz.httpRequest.send();

};

//<--------Where UNUSED CODE was------------->



/*TODO: modify this function for our project
 *  cs441GoogleMapsViz.initialize()
 *
 *  A function to: 
 *  1. create a google map centered at the us
 *  2. Initialize two layer objects, one for zipcodes and one for schools.
 *  3. instantiate a google maps geocoder service.  
 *   
 *  @param void
 *  @return void
 */
cs441GoogleMapsViz.initialize = function() {

	// Set the Google API key for this namespace.
	cs441GoogleMapsViz.apikey = 'AIzaSyCGPkL4Q0Ki278FcPmJAjlMIzwQPtyiLdk';
	
	// Create the httpRequestor for this namespace.
	cs441GoogleMapsViz.makeRequestor();

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
	
	// Create a listener for the add filter button
	// TODO: currently only adds the high school filter
	cs441GoogleMapsViz.addEvent(document.getElementById('filterButton'), 'click', function() {
		// TODO: only works for high school filter
		cs441GoogleMapsViz.addFilter("High School", "HS");
		
		// removes old filter drop down and replaces it with a new filter drop down containing
		// a list of the updated available filters
		// TODO: rather than creating new object, find a way to update and refresh
		el = document.getElementById("filterSelector");
		selectEl = document.getElementById("filter");
		el.removeChild(selectEl);
		filterMenu.createMenu();
		
		// removes old filter display and replaces it with a new one containing updated information
		// TODO: rather than creating new object, find a way to update content and refresh
		el = document.getElementById("filterPanel");
		filterInfoEl = document.getElementById("display");
		el.removeChild(filterInfoEl);
		filterDisplay.createDisplay();	
	});
	
	// Create a listener for the remove filter button
	//cs441GoogleMapsViz.addEvent(document.get)
	
	
//<-----------Where UNUSED CODE2 was------->

	//
	// Constructing the Filter Menu Selector
	//
	// Create the Filter Selection menu
	// Connect the filter menu to the "filterMenu" that is on the index.html page.
	// Get the menu options from the model method, getInactiveFilters().
	// Attach the method selectMenuOption() to the menu such that whenever the menu changes,
	// the selectMenuOption() method is called.
	var filterMenu = new cs441GoogleMapsViz.FilterMenu("filterSelector", "filter", "filterSelection", "filterSelector", cs441GoogleMapsViz.getInactiveFilters(), function() {
		return cs441GoogleMapsViz.selectMenuOption();
	});
	filterMenu.createMenu();
	
	//
	// Constructing the Filter Display Panel
	//
	// Create the filter display panel
	// Connect the filter display panel to the "filterDisplay" that is in the index.html page. 
	var filterDisplay = new cs441GoogleMapsViz.FilterDisplay("filterDisplay", "display", "filterDisplay", "filterPanel", cs441GoogleMapsViz.getSelectedFilters());
	filterDisplay.createDisplay();
	
};
// Setup an event listener to execute the init() function for this namespace
// upon page load.
google.maps.event.addDomListener(window, 'load', cs441GoogleMapsViz.initialize);


//###################### UNUSED CODE ##################
// /*
 // *  cs441GoogleMapsViz.lookup()
 // *
 // *  For an array of layers, this function filters the layers
 // *  according to the CEEB grabbed from the page (that is,
 // * 	entered by the user) and recenters the layer's map at the zipcode
 // *  associated with the given CEEB.
 // *
 // *  This function assumes that all the layers are on the same map.
 // *  Thus, when resetting the zoom and recentering the map, these
 // *  operations are done only once on the first layer.
 // *
 // *  @param layerArray An array of Google FusionTableLayers.
 // *  @param geocoder The geocoder service to use to recenter the map.
 // *  @return void
 // */
// cs441GoogleMapsViz.lookup = function(layerArray, geocoder) {
// 
	// // Get the CEEB code from the page, as entered by the user.
	// var ceeb = cs441GoogleMapsViz.getCEEB();
// 
	// // Did the user type anything?
	// if(ceeb == "") {
// 
		// // Give an error message to the user:
		// cs441GoogleMapsViz.getErrorMsgElement().innerHTML = "Error: Please enter a CEEB";
	// }
// 
	// // Did the user enter the CEEB?
	// else {
		// // Clear any error message.
		// cs441GoogleMapsViz.getErrorMsgElement().innerHTML = "";
// 
		// // Get the corresponding zipcode for this CEEB.  The zipcode for this
		// // CEEB is contained in the same row as the CEEB in the Google Fusion
		// // tables.  So, I need to get the Zip in the row whose 'Code' is
		// // the CEEB entered by the user.  This is done using the GET API
		// // specified in the Google Fusion Tables Developer documentation.
// 
		// // Create a url for
		// // a subsequent GET request to a Google server.
		// var query = "SELECT 'Zip' FROM " + layerArray[1].eID + " WHERE Code = " + ceeb;
// 
		// var url = "https://www.googleapis.com/fusiontables/v1/query";
		// url = url + "?sql=";
		// url = url + query;
		// url = url + " &key=" + cs441GoogleMapsViz.apikey;
// 
		// function filterLayers() {
			// if(cs441GoogleMapsViz.httpRequest.readyState === 4) {
				// if(cs441GoogleMapsViz.httpRequest.status === 200) {
// 
					// // The code reaches this point because the Google server
					// // responded with some useful data.
					// console.log(cs441GoogleMapsViz.httpRequest.responseText);
// 
					// // The response is just a string.  I need
					// // to parse it so that I can extract the zip code from it.
					// var response = JSON.parse(cs441GoogleMapsViz.httpRequest.responseText);
// 
					// if(response["rows"] != undefined) {
						// // Set 	the zoom.
						// layerArray[0].map.setZoom(11);
// 
						// var zipcode = response["rows"][0].toString();
// 
						// // Center the map.
						// centerAt(layerArray[0].map, zipcode, geocoder);
// 
						// // Filter the zip layer by zip
						// cs441GoogleMapsViz.filterByZip.call(layerArray[0], zipcode);
// 						
						// // Filter the school layer by CEEB.
						// cs441GoogleMapsViz.filterByCEEB.call(layerArray[1], ceeb);
// 						
// 						
					// } else {
						// // Indicate to the user that I could not find that
						// // CEEB.
						// cs441GoogleMapsViz.getErrorMsgElement().innerHTML = "Cannot locate CEEB: " + ceeb + ".";
					// }
// 
				// } 
			// }
		// }
	// }
// 
	// // Send the GET Request to the Google Server
	// cs441GoogleMapsViz.sendRequest(url, filterLayers);
// };

// /*
 // *  cs441GoogleMapsViz.toggle()
 // *
 // *  @param layerArray An array of Layer objects to toggle.
 // *  @return void
 // */
// cs441GoogleMapsViz.toggle = function(layerArray) {
// 
	// // Get the zip code from the page, as entered by the user.
	// var zip = cs441GoogleMapsViz.getZip();
// 
	// // Toggle each layer by the zip.
	// cs441GoogleMapsViz.forEach(layerArray, function(t) {
		// cs441GoogleMapsViz.toggleLayer.call(t, zip);
	// });
// };
// 
// /*
 // *  cs441GoogleMapsViz.regionalize()
 // * 
 // *  This function filters an array of layer objects based on the
 // *  region name grabbed from the page (that is, entered by the user)
 // *  and recenters the map at the region.
 // *
 // *  @param layerArray An array of Layer objects to regionalize.
 // *  @param geocoder The geocoder service to use to recenter the map.
 // *  @return void
 // */
// cs441GoogleMapsViz.regionalize = function(layerArray, geocoder) {
// 
	// // Get the region name from the page, as entered by the user.
	// var region = cs441GoogleMapsViz.getRegion();
// 	
	// // Filter each layer by the region.
	// cs441GoogleMapsViz.forEach(layerArray, function(t) {
		// cs441GoogleMapsViz.filterByRegion.call(t, region);
	// });
// 	
		// // Set the zoom.
	// layerArray[0].map.setZoom(6);
// 	
	// // Center the map at the state corresponding to the region.
	// centerAt(layerArray[0].map, cs441GoogleMapsViz.convertRegionToState(region), geocoder);
// };




//############ UNUSED CODE2 #################

	// //
	// //	Construct the layers
	// //
	// // Create a Layer object for the zip code boundary layer.  The second parameter
	// // creates the Google FusionTablesLayer object.  The Layer is not currently being
	// // filtered, so the final parameter is false.
	// var zipLayer = new cs441GoogleMapsViz.Layer("zips", new google.maps.FusionTablesLayer({
		// query : {
			// from : zipEID
		// }
	// }), zipEID, map, 'ZipCodeArea', false);
// 
	// // Create a Layer object for the high schools layer.  The second parameter
	// // creates the Google FusionTablesLayer object.  The Layer is not currently being
	// // filtered, so the final parameter is false.
	// var schoolLayer = new cs441GoogleMapsViz.Layer("schools", new google.maps.FusionTablesLayer({
		// query : {
			// from : schoolEID
		// }
	// }), schoolEID, map, 'Zip', false);
// 
	// // Create an array of Layers
	// var layerArray = new Array();
	// layerArray.push(zipLayer);
	// layerArray.push(schoolLayer);
// 
	// // Add a listener to the zip layer.  When the user clicks on the
	// // particular zip code area in the layer, some information
	// // about the particular zip code is displayed in the info portion
	// // of the page.
	// google.maps.event.addListener(zipLayer.ref, 'click', function(displayedArea) {
// 
		// // Get the necessary information from the clicked area
		// var information = displayedArea.row['ZipCodeArea'].value + "<br>";
// 
		// // Format and display it in the information window for the displayed area.
		// cs441GoogleMapsViz.formatInfoWindow(displayedArea, information);
	// });
	// // Attach the function lookup() to the lookupButton on the main page.
	// cs441GoogleMapsViz.addEvent(document.getElementById('lookupButton'), 'click', function() {
		// return cs441GoogleMapsViz.lookup(layerArray, geocoder);
	// });



