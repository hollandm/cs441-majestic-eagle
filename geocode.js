/*
 *  geocode.js
 *
 *  A collection of functions that locate places and move a google map
 *  to those places.
 *
 *  @author Tanya L. Crenshaw
 */

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
function centerAt(map, address, geocoder) {

	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}