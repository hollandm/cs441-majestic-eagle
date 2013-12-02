/**
 * hsMarker.js
 *
 * This file contains code display a marker and its popup on the map
 *  
 * @author Matt Holland 
 * @since October 31st, 2013
 */

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

cs441GoogleMapsViz.markers = [];


/**
 * The high school marker class creates a map marker and a infoWindow for that marker
 * 
 * Upon clicking the marker we will get info about that high school from the students 
 * database and display it on the infoWindow
 * 
 * @param school: is the school whos info we will be displaying 
 */
cs441GoogleMapsViz.hsMarker = function(school) {
	
	var myLatlng = new google.maps.LatLng(school.lat,school.lng);
		
	var marker = new google.maps.Marker({
		map: cs441GoogleMapsViz.map,
		position: myLatlng,
		title: school.name + ", " + school.state,
		icon: 'graduation.png'
		
		// icon: 'http://upload.wikimedia.org/wikipedia/commons/7/76/Farm-Fresh_money.png'
		// icon: 'https://cdn1.iconfinder.com/data/icons/packy_by_etcoman/48/Pokeball.png'
		// icon: 'http://www.gothamschools.org/wp-content/themes/gotham/images/obama_icon.png'
		// icon: 'https://storage.googleapis.com/support-kms-prod/SNP_2752125_en_v0'
	});

		
	var infoWindow = new google.maps.InfoWindow({
      content: ""
  	});
	
	// console.log(marker);
	// marker.setMap(null);
	
	this.marker = marker;
	this.infoWindow = infoWindow;
	this.schoolCeeb = school.ceeb;
	
	// google.maps.event.addListener(this.marker, 'click', this.onClick);
	
	//TODO: Try to figure out how not to do this as an internal function.
	// 			Currently it needs the closure properties to reference marker and info window
	google.maps.event.addListener(marker, 'click', function() {
		
		cs441GoogleMapsViz.updateHighSchool(school.ceeb);
		
	    infoWindow.open(cs441GoogleMapsViz.map, marker);
	});

	this.hideMarker = function() {
		this.marker.setMap(null);
	};

	
};


/*
 * cs441GoogleMapsViz.setMarkerInfo()
 * TODO: shit
 *
 * @param none
 * @return void 
 */
cs441GoogleMapsViz.setMarkerInfo = function(school) {
		var infoContent = '<div id=content>' +
		'<div id=infotitle>' +
		'<h2 id=hsname>' + school.name + '</h2>' +
		'<h2 id=ceeb>CEEB: ' + school.ceeb + '</h2>'  +
		'</div>' +
		'<div class=divider></div>' +
		'<ul id="info">' +
		'<li title="Number of prospective students who have interacted with UP">Inquired: ' + school.inquired + '</li>' +
		'<li title="Number of prospective students who have applied to UP">Applied: ' + school.applied + '</li>' +
		'<li title="Number of prospective students who have been accepted into UP">Accepted: ' + school.accepted + '</li>' +
		'<li title="Number of prospective students who have enrolled as a student">Enrolled: ' + school.enrolled + '</li>' +
		'<li title="Average GPA of prospective students">Average GPA: ' + school.avgGpa + '</li>' +
		'<li title="Average of the sum of each prospective students Verbal and Math  SAT Scores">Average SAT: ' + school.avgSat + '</li>' +
		'</ul>' +
		'</div>';
		
		var mks = cs441GoogleMapsViz.markers;
		
		for (var i = 0; i < mks.length; ++i) {
			mk = mks[i];
			if (mk.schoolCeeb == school.ceeb) {
				mk.infoWindow.content = infoContent;
				mk.infoWindow.open(cs441GoogleMapsViz.map, mk.marker);
			} 
			else {
				mk.infoWindow.close(cs441GoogleMapsViz.map, mk.marker);
			}
		}
};




