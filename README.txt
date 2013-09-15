********************************
cs441GoogleMapsViz README.txt
Written by Tanya L. Crenshaw
Sept 15, 2013
********************************

This publically available code is a working sample of how one might use 
Google Maps and Google Fusion Tables to visualize a variety of admissions 
data as well as more generic data such as high school addresses, zip codes, 
and CEEBs.

In order for this code to work, you must supply an API key. This API key is
used when making requests of Google's servers; Google wants to make sure 
nobody is over-using the Google services without paying for them.

1. To get an API key, you must register yourself and your web development 
project.  Visit: 

https://code.google.com/apis/console/

2. Once you have your API key, locate the following code in usmap.js:

cs441GoogleMapsViz.initialize = function() {

	// Set the Google API key for this namespace.
	cs441GoogleMapsViz.apikey = 'Your API Key Here';
	
And paste in your API key.