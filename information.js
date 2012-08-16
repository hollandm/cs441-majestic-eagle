/*
 *  information.js
 *
 *  A collection of functions that collect and format the information that
 * is displayed about the zipcode areas on the map.
 *
 *  @author Tanya L. Crenshaw
 */


/*
 *  formatInfoWindow()
 * 
 * Based on the parameter 'information', format and display a collection
 * of information in the infoWindow for the FusionTablesLayer selection
 * parameter.
 *
 * @param displayedArea The FusionTablesLayer selection that is 
 * currently displayed.
 * 
 * @param information The data to be displayed in the infoWindow 
 * for the current display.
 * 
 * @return void
 */
function formatInfoWindow(displayedArea, information)
{
			displayedArea.infoWindowHtml ="";
	        displayedArea.infoWindowHtml += "<p>Zip Code: " + information + "</p>";
}

    
