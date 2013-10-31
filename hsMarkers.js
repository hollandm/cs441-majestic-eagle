/**
 * hsMarker.js
 *
 * This file contains code display a marker and its popup on the map
 *  
 * @author Matt Holland 
 * @since October 31st, 2013
 */

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};


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
		title: school.name + ", " + school.state
	});
	var infoContent = '<div id=content>' +
		'<div id=infotitle>' +
		'<h2 id=hsname>' + school.name + '</h2>' +
		'<h2 id=ceeb>CEEB: ' + school.ceeb + '</h2>'  +
		'</div>' +
		'<div class=divider></div>' +
		'<ul id="info">' +
		'<li>applied: ' + school.applied + '</li>' +
		'<li>accepted: ' + school.accepted + '</li>' +
		'<li>enrolled: ' + school.enrolled + '</li>' +
		'<li>inquired: ' + school.inquired + '</li>' +
		'<li>average GPA: ' + school.avgGpa + '</li>' +
		'<li>average SAT: ' + school.avgSat + '</li>' +
		'</ul>' +
		'</div>';
		
	var infoWindow = new google.maps.InfoWindow({
      content: infoContent
  	});
	
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

};





