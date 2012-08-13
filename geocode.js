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
 *  Re-center the window object's 'map' to the zipcode provided by the
 *  page.  Select the zipcode from the FusionTablesLayer data and display 
 *  only that zipcode.
 *
 * @param void
 * @return void
 */
function goToZip() {

	// Get the zip code from the page, as entered by the user.
	var zip = document.getElementById("zipcode").value;

	// Dynamically create the title of the map, restating the zipcode just searched
	document.getElementById("map_title").innerHTML = '<p>' + zip + '<\p>';

	// The Encrypted ID used below is that of tl_2010_41_zcta051_clean.kml available
	// in Tanya Crenshaw's public fusion tables.  Use a query to display only the zipcode
	// entered by the user on the page.
	var layer = new google.maps.FusionTablesLayer({
		query : {
			from : '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU',
			where : 'ZipCodeArea = ' + zip

		}
	});
	layer.setMap(window.map);
	window.map.setZoom(11);

	codeAddress(zip);

}

/*
 *  codeAddress()
 *
 *	Given an address, use the Google geocode service to obtain the
 *  latitude and longitude points for that address and center the
 *  window object's 'map' at the lat/lon point provided.
 *
 *  Note that the Google geocoder service is an asynchronous call,
 *  so an anonymous callback function is used to handle the result.
 *
 *  Based largely on the geocode sample provided in the Google Developer
 *  documentation for Google Maps API 3 for Javascript.
 *
 *  @param address A string representing an address, such as "Chicago"
 *  or "92171"
 *
 *  @return void
 * */
function codeAddress(address) {

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