// Name: map.js
// Description: A script to construct a google map centered
// at Salem, Oregon in the map_canvas container of an html
// document.
// Written by: Tanya L. Crenshaw

function initialize(){

	// Initialize map information
	var salemZipCodes = ['97303', '97302'];

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
            
    var zipCodeAreas = new Array();
    	   	   
	for(i = 0; i < 2; i++)
	{
		// Create the polygon that outlines the current zipcode
		zipCodeAreas[i] = new google.maps.Polygon({
    	   paths: zips[salemZipCodes[i]],
    	   strokeColor: "#FF0000",
    	   strokeOpacity: 0.8,
    	   strokeWeight: 2,
    	   fillColor: "#FF0000",
    	   fillOpacity: 0.35    	
        });
             
       console.log("Hi " + salemZipCodes[i] + "!");      
    
    	let j = i;        	      
        google.maps.event.addListener(zipCodeAreas[i], 'click', function(event) {	
			console.log("Hi " + salemZipCodes[j] + ' ' + "!"); 
			
        }); 
       	       
       // Draw the polygon on the map.
       zipCodeAreas[i].setMap(map);
      
   }

}