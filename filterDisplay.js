/*TODO: Rework this whole class after the model has been fixed.
 * filterDisplay.js
 *
 * A collection of methods for the application-specific FilterDisplay object. The
 * filterDisplay object displays a list of the filters that have been applied
 * and their corresponding filter parameters.
 * 
 * @Sherry Liao
 */

/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

/* FilterDisplay Menu constructor
 *
 * @param name The name for the HTML element representing this FilterDisplay object.
 * @param idName The id for the HTML element representing this FilterDisplayobject.
 * @param className The class for the HTML element representing this FilterDisplay object.
 * @param divId The HTML div element's id where the filter is to be placed.
 * @param menuItems The object containing all the filter information with which to populate the menu.
 * 
 */

cs441GoogleMapsViz.FilterDisplay = function(name, idName, className, divId) {
	this.name = name;
	this.idName = idName;
	this.className = className;
	this.divId = divId;

	this.createDisplay = function() {
		return cs441GoogleMapsViz.createDisplay.call(this);
	};

};

/*
 * createMenu
 *
 * Create a div to hold the 
 */
cs441GoogleMapsViz.createDisplay = function() {

	// Get the HTML element to which this menu has been assigned.
	el = document.getElementById(this.divId);

	// Create a div element
	var filterInfoDisplay = document.createElement("div");

	// Set some attributes
	filterInfoDisplay.setAttribute("name", this.name);
	filterInfoDisplay.setAttribute("id", this.idName);

	// Create some options in the select element based on the
	// menuItems assigned to this object.
	activeFilters = cs441GoogleMapsViz.getActiveFilters();
	// alert(activeFilters["High School"].isActive);
	
	for(var key in activeFilters) {
		filterInfo = document.createElement("p");
 		text = document.createTextNode(activeFilters[key].name + ": ");
		strongText = document.createElement("strong");
 		strongText.appendChild(text);
 		filterInfo.appendChild(strongText);
		text = document.createTextNode(activeFilters[key].input);
		filterInfo.appendChild(text);
		// // Add the delete button
		// var deleteButton = document.createElement("button");
// 		
		// // Set the attribute for the remove filter button
		// deleteButton.setAttrbute("id", cs441GoogleMapsViz.getMenuOption() + "deleteButton");
		// // Add the 'X' to the button
		// text = document.createTextNode(X);
		// deleteButton.appendChild(text);
// 		
		// Add the button to the filterInfo
		// filterInfo.appendChild(deleteButton);
// 		
		// Add the filter info to the display
		filterInfoDisplay.appendChild(filterInfo);
	}

	// Append the resulting select menu to the div assigned
	// to this object.
	el.appendChild(filterInfoDisplay);

};