// Name: usmap.js
// Description: A script to construct a google map centered
// at the contiguous United States in the contig_us_map_canvas container 
// of an html document.
// Written by: Tanya L. Crenshaw

function initialize(){


   
    // How many people applied to each city in 2007.
	var cities = {}
	
    cities['beaverton'] = {
        center: new google.maps.LatLng(45.479686, -122.809954),
        applications: 490
    };

    cities['honolulu'] = {
        center: new google.maps.LatLng(21.308950, -157.826182),
        applications: 524
    };
    
    cities['portland'] = {
        center: new google.maps.LatLng(45.523040, -122.640155),
        applications: 1455
    };
    
    cities['seattle'] = {
        center: new google.maps.LatLng(47.6740, -122.2882),
        applications: 945
    };

    cities['spokane'] = {
        center: new google.maps.LatLng(47.66, -117.43),
        applications: 302
    };


	// The center point of the map is Lincoln, NB.
    var latlng = new google.maps.LatLng(40.8358, -96.6452);
      
    var myOptions = {
      zoom: 4,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
           
  	// Draw the map using the options defined above.
    var usmap = new google.maps.Map(document.getElementById("contig_us_map_canvas"),
        myOptions);
    
    // Create an array to hold a bunch of circles, one per city.        
    var cityCircles = {};
    
	for(city in cities)
	{
		 var circleOptions = {
           strokeColor: "#FF0000",
           strokeOpacity: 0.8,
           strokeWeight: 2,
           fillColor: "#FF0000",
           fillOpacity: 0.35,
           map: usmap,
           center: cities[city].center,
           radius: cities[city].applications * 100 
        };
        
       cityCircles[city] = new google.maps.Circle(circleOptions);

	   let i = city;
       google.maps.event.addListener(cityCircles[i], 'click', function(event) {	
			dispatchCityMap(i);
			
        });   
     	       
       // Draw the polygon on the map.
       cityCircles[city].setMap(usmap);
      
   }

}

function dispatchCityMap(city)
{
	console.log("Hi " + city + "!"); 	
	location.href = "citymap.html";
}
