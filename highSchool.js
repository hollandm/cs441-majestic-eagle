

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

cs441GoogleMapsViz.highShool = {};

/**
 * highSchool
 *
 * The High School object 
 */
cs441GoogleMapsViz.highShool.highSchool = function(ceeb, name, location) {
	
	this.ceeb = ceeb;
	this.name = name;
	this.location = location;
	
	this.gpa = 0;
	this.sat = 0;
	this.students = 0;
	
}

/**
 * loadHighschools
 * 
 * 
 */
function loadHighschools() {
	if (cs441GoogleMapsViz.HShttpRequest.readyState === 4) {
		if(cs441GoogleMapsViz.HShttpRequest.status === 200) {
	
			
			// The code reaches this point because the Google server
			// responded with some useful data.
			//console.log(cs441GoogleMapsViz.HShttpRequest.responseText);
		
			// The response is just a string.  I need
			// to parse it so that I can extract the zip code from it.
			var response = JSON.parse(cs441GoogleMapsViz.HShttpRequest.responseText);

			//console.log(response);
			
			cs441GoogleMapsViz.schools = {}
			
			for(var i = 0; i < response.rows.length; i++) {
				var hs = response.rows[i];

				cs441GoogleMapsViz.schools[hs[0]] = new cs441GoogleMapsViz.highShool.highSchool(hs[0], hs[1], hs[2]);
				
			}
			
			console.log(cs441GoogleMapsViz.schools)
			
			cs441GoogleMapsViz.highShool.refreshStats()
			
		} 
	}
}

/**
 * refreshStats
 * 
 */
cs441GoogleMapsViz.highShool.refreshStats = function() {
	
	cs441GoogleMapsViz.statsHttpRequest = new XMLHttpRequest();

	function respondStats() {
		if (cs441GoogleMapsViz.statsHttpRequest.readyState === 4) {
			if(cs441GoogleMapsViz.statsHttpRequest.status === 200) {
		
				var response = JSON.parse(cs441GoogleMapsViz.statsHttpRequest.responseText);
				
				
				
				cs441GoogleMapsViz.schools[response[0]].students += 1;
				cs441GoogleMapsViz.schools[response[0]].gpa += response[1];
				//cs441GoogleMapsViz.schools[response[0]].sat += (response[2] + response[3])/2; //TODO: Have average in the database to avoid extra math
				
				console.log(response)
				
			}
		}
	}
	
	//var query = "SELECT 'Code', 'HighSchool', 'Address' FROM " + schoolEID;
	var query = "SELECT 'HighSchoolCode','HS_GPA', 'SAT_MAth', 'SAT_Verbal', 'Application_Status', 'App_Decision_Code', 'Confirmed', 'Enrolled' FROM 13na5H4_enS7_zftNnAhsd1JWpgDBVv6tg5P_624";
	//
		
	var url = "https://www.googleapis.com/fusiontables/v1/query";
	url = url + "?sql=";
	url = url + query;
	url = url + " &key=" + cs441GoogleMapsViz.apikey;
	
	cs441GoogleMapsViz.statsHttpRequest.onreadystatechange = respondStats;
	cs441GoogleMapsViz.statsHttpRequest.open('GET', url);
	cs441GoogleMapsViz.statsHttpRequest.send();

}

cs441GoogleMapsViz.apikey = 'AIzaSyCGPkL4Q0Ki278FcPmJAjlMIzwQPtyiLdk'

var schoolEID = '1TysRKf1siV396AMbUKmi8w2-XB3Zeye2ObXjl8Y';	
var query = "SELECT 'Code', 'HighSchool', 'Address' FROM " + schoolEID;


var url = "https://www.googleapis.com/fusiontables/v1/query";
url = url + "?sql=";
url = url + query;
url = url + " &key=" + cs441GoogleMapsViz.apikey;


cs441GoogleMapsViz.HShttpRequest = new XMLHttpRequest();

// Send the GET Request to the Google Server
//cs441GoogleMapsViz.sendRequest(url, loadHighschools);

cs441GoogleMapsViz.HShttpRequest.onreadystatechange = loadHighschools;
cs441GoogleMapsViz.HShttpRequest.open('GET', url);
cs441GoogleMapsViz.HShttpRequest.send();

//alert("HS Database Loaded");
