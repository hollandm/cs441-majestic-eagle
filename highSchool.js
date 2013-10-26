

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

cs441GoogleMapsViz.highShool = {};

/**
 * highSchool
 *
 * The High School object 
 */

cs441GoogleMapsViz.highShool.highSchool = function(ceeb, name, location) {
	
	//alert("Creating HS Object");
	this.ceeb = ceeb;
	this.name = name;
	this.location = location;
	this.display = true;
	
	this.gpa = 0;
	this.sat = 0;
	this.students = 0;
	
}

function filterLayers() {
	console.log(cs441GoogleMapsViz.httpRequest2);
	if (cs441GoogleMapsViz.httpRequest2.readyState === 4) {
		console.log(cs441GoogleMapsViz.httpRequest2);
		if(cs441GoogleMapsViz.httpRequest2.status === 200) {
			console.log(cs441GoogleMapsViz.httpRequest2);
			console.log(cs441GoogleMapsViz.httpRequest2.responseText);
			console.log(cs441GoogleMapsViz.httpRequest2);
			//alert("Filter");
			
			// The code reaches this point because the Google server
			// responded with some useful data.
			console.log(cs441GoogleMapsViz.httpRequest2.responseText);
		
			// The response is just a string.  I need
			// to parse it so that I can extract the zip code from it.
			var response = JSON.parse(cs441GoogleMapsViz.httpRequest2.responseText);

			console.log(response);
			
			/*
			
			if(response["rows"] != undefined) {
				// Set 	the zoom.
				layerArray[0].map.setZoom(11);

				var zipcode = response["rows"][0].toString();

				// Center the map.
				centerAt(layerArray[0].map, zipcode, geocoder);

				// Filter the zip layer by zip
				cs441GoogleMapsViz.filterByZip.call(layerArray[0], zipcode);
				
				// Filter the school layer by CEEB.
				cs441GoogleMapsViz.filterByCEEB.call(layerArray[1], ceeb);
				
				
			} else {
				// Indicate to the user that I could not find that
				// CEEB.
				cs441GoogleMapsViz.getErrorMsgElement().innerHTML = "Cannot locate CEEB: " + ceeb + ".";
			}
			*/
		} 
	}
	console.log(cs441GoogleMapsViz.httpRequest2);
}

//console.log(cs441GoogleMapsViz);
cs441GoogleMapsViz.apikey = 'AIzaSyCGPkL4Q0Ki278FcPmJAjlMIzwQPtyiLdk'

var schoolEID = '1TysRKf1siV396AMbUKmi8w2-XB3Zeye2ObXjl8Y';	
var query = "SELECT 'HighSchool' FROM " + schoolEID;


var url = "https://www.googleapis.com/fusiontables/v1/query";
url = url + "?sql=";
url = url + query;
url = url + " &key=" + cs441GoogleMapsViz.apikey;

//url = "http://www.google.com"

cs441GoogleMapsViz.httpRequest2 = new XMLHttpRequest();

// Send the GET Request to the Google Server
//cs441GoogleMapsViz.sendRequest(url, filterLayers);

cs441GoogleMapsViz.httpRequest2.onreadystatechange = filterLayers;
cs441GoogleMapsViz.httpRequest2.open('GET', url);
cs441GoogleMapsViz.httpRequest2.send();


 
var hss = {};
var index = 0;

for (index = 0; index < 5000; ++index) {
	hss[index] = cs441GoogleMapsViz.highShool.highSchool(123, "ABC", "ABC");
}


//alert("HS Database Loaded");
