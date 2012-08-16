/*
 *  layers.js
 *
 *  A collection of functions that control what portions of the 
 *  layers are visible on the map.
 *
 *  @author Tanya L. Crenshaw
 */

/*
 * showSurroundings()
 * 
 * @param void
 * @return void
 */
function showSurroundings()
{
	// Dynamically create the title of the map, restating the zipcode just searched
	// and also toggle the hide/show surroundings button.
	var zip = document.getElementById("zipcode").value;
	document.getElementById("map_title").innerHTML = '<p>Most recent lookup: ' + zip + "   " + '<input type="button" value="Hide Surrounding High Schools" onclick="hideSurroundings()"></p>';

	// Show everything in the two layers.
	window.ziplayer.setOptions({
		query : {
			from : '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU',
		}
	});

	window.schoollayer.setOptions({
		query : {
			from : '1YcgR53xYb2OQm77NNyYfMh7-nwkrtZxoig7U_ms',
		}
	});

}

/*
 * hideSurroundings()
 * 
 * @param void
 * @return void
 */
function hideSurroundings()
{
	// Dynamically create the title of the map, restating the zipcode just searched
	// and also toggle the hide/show surroundings button.
	var zip = document.getElementById("zipcode").value;
	var numericZip = zip - 0;

	document.getElementById("map_title").innerHTML = '<p>Most recent lookup: ' + zip + "  " + '<input type="button" value="Show Surrounding High Schools" onclick="showSurroundings()"></p>';

	// Restrict the two layers to view only the queried zip code area.
	window.ziplayer.setOptions({
		query : {
			from : '1U6n-9O6I9q4qG10uNcNrCAlvactfL7O07IVPLbU',
			where : 'ZipCodeArea = ' + zip
		}
	});

	window.schoollayer.setOptions({
		query : {
			from : '1YcgR53xYb2OQm77NNyYfMh7-nwkrtZxoig7U_ms',
			where : 'Zip = ' + numericZip
		}
	});
	
}


