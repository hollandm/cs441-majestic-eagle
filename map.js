/**
 * @author crenshaw
 */
function initialize(){

	// Initialize map information

	// The center point of the map is Salem, OR
    var latlng = new google.maps.LatLng(44.9392863,-123.0425964);

    var myOptions = {
      zoom: 10,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
           
  	// Draw the map using the options defined above.
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
            
    // Create a marker at the initial center position of the map.
    // The "title" is what is displayed when the user hovers over 
    // the marker.  This is called a Google Maps "tooltip".
	var marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"Salem, OR"
   });

	// Create the polygon that outlines zipcode 97303
	// Call the function constructZipCodeArray() to 
	// get the path of geopgraphical points.
	zipCodeArea = new google.maps.Polygon({
    	paths: constructZipCodeArray(),
    	strokeColor: "#FF0000",
    	strokeOpacity: 0.8,
    	strokeWeight: 2,
    	fillColor: "#FF0000",
    	fillOpacity: 0.35
    });

  // Draw the polygon on the map.
  zipCodeArea.setMap(map);
    
}    
