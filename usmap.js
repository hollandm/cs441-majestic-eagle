/* 
 *  usmap.js
 *
 *  @author Tanya L. Crenshaw 
 */


/*
 *  initialize()
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
function initialize(){

	// Get the directory of city information.
	cities = cityDirectory();

	// Instatiate a new geocoder service
	geocoder = new google.maps.Geocoder();

   	// The center point of the map is Lincoln, NB.
    var usa = new google.maps.LatLng(40.8358, -96.6452);
      
    var myOptions = {
      zoom: 4,
      center: usa,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

           
  	// Draw the map using the options defined above.
    map = new google.maps.Map(document.getElementById("contig_us_map_canvas"),
        myOptions);
    
    
    // Instantiate the layers
    
    
	// The Encrypted ID used below is that of tl_2010_41_zcta051_clean.kml 
	// available in Tanya Crenshaw's public fusion tables.  Use a query to 
	// display only the zipcode entered by the user on the page.
	ziplayer = new google.maps.FusionTablesLayer({
		query : {
			from : '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU'
		}
	});
    
    
	// The Encrypted ID used below is that of 
	// OregonHighSchools_withManualFusionTableFixes.csv available
	// in Tanya Crenshaw's public fusion tables.  Use a query to display 
	// only the zipcode entered by the user on the page.
	schoollayer = new google.maps.FusionTablesLayer({
		query : {
			from : '1YcgR53xYb2OQm77NNyYfMh7-nwkrtZxoig7U_ms',
		}
	});
	
	// Add a listener to the layer.  When the user clicks on the 
	// particular zip code area in the layer, some information 
	// about the particular zip code is displayed in the info portion 
	// of the page.
	google.maps.event.addListener(ziplayer, 'click', function(displayedArea) {

		// Get the necessary information from the clicked area
		var information = displayedArea.row['ZipCodeArea'].value + "<br>";

		// Format and display it in the information window for the displayed area.
		formatInfoWindow(displayedArea, information)
	});
    
    
    
    
    // Create an array to hold a bunch of circles, one per city.        
    var cityCircles = {};
    
    
    // TLC:
    // The subsequent code does not work in Google Chrome as Chrome does
    // not support Javascript 1.7 'let' statement.   However, I'm leaving
    // this code in here until I find a suitable replacement solution
    // that works in both Firefox and Chrome.
    
    /*
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
			location.href = "citymap.html?" + i ;
        });   
     	       
       // Draw the polygon on the map.
       cityCircles[city].setMap(usmap);
      
   }
    */

}


