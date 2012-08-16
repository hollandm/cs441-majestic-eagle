/*
 *  geocode.js
 *
 *  A collection of functions that locate places and move a google map
 *  to those places.
 *
 *  @author Tanya L. Crenshaw
 */

/*
 *  goToZip()
 *
 *  Select the zipcode from the FusionTablesLayer data and display
 *  only that zipcode.   Re-center the window object's 'map' to the
 *  zipcode provided by the page.  
 *
 * @param void
 * @return void
 */
function goToZip() {

	// Get the zip code from the page, as entered by the user.
	var zip = document.getElementById("zipcode").value;
	var numericZip = zip - 0;

	// Dynamically create the title of the map, restating the zipcode just searched
	// and also add a button.
	document.getElementById("map_title").innerHTML = '<p>Most recent lookup: ' + zip + "  " + '<input type="button" value="Show Surrounding High Schools" onclick="showSurroundings()"></p>';

	// Restrict the two layers to view only the queried zip code area.
	window.ziplayer.setOptions({
		query : {
			from : '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU',
			where : 'ZipCodeArea = ' + zip
		}
	});

	window.schoollayer.setOptions({
		query : {
			from : '1YcgR53xYb2OQm77NNyYfMh7-nwkrtZxoig7U_ms',
			where : 'Zip = ' + numericZip
		}
	});

	// Set the two layers on the map.  It's important to set schoollayer
	// second so that they are on top of the ziplayer, and therefore clickable.
	// Otherwise they are underneath and cannot be reached by the mouse.
	window.ziplayer.setMap(window.map);
	window.schoollayer.setMap(window.map);

	window.map.setZoom(11);

	centerAt(zip);

}

/*
 *  centerAt()
 *
 *	Given an address, use the Google geocode service to obtain the
 *  latitude and longitude points for that address and center the
 *  window object's 'map' at the lat/lon point provided.
 *
 *  Note that the Google geocoder service is an asynchronous call,
 *  so an anonymous callback function is used to handle the result.  
 *  Otherwise, the page will hang.  
 *
 *  Based largely on the geocode sample provided in the Google Developer
 *  documentation for Google Maps API 3 for Javascript.
 *
 *  @param address A string representing an address, such as "Chicago"
 *  or "92171"
 *
 *  @return void
 * */
function centerAt(address) {

	window.geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			window.map.setCenter(results[0].geometry.location);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}