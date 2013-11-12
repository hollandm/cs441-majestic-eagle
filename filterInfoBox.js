/*
 * filterInfoBox.js
 *
 * A collection of methods for the application-specific filterInfoBox object. A
 * filterInfoBox object displays a filter and its inputs on the filter display
 * panel.
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

/*
 * FilterInfoBox
 * 
 * Constructor for filterInfoBox
 * 
 * @param idName 	id to use for the filterInfoBox div
 * @param input		input to be displayed
 */
cs441GoogleMapsViz.FilterInfoBox = function(idName, input) {
	this.idName = idName;
	this.input = input;
	this.removeButton = document.createElement("button");

	// creates the filterInfoBox, which is a div containing text that details the filter
	// and its input, and an exit button
	this.createInfoBox = function() {
		// create the div object, set the id and class
		el = document.getElementById("filterPanel");	
		filterInfo = document.createElement("div");
		filterInfo.setAttribute("id", "infoBox"+this.idName);
		filterInfo.setAttribute("class", "filterBox");
		
		// display the name of the filter selected
 		text = document.createTextNode(this.idName+ ": ");
		strongText = document.createElement("strong");
 		strongText.appendChild(text);
 		
 		// display the input
 		filterInfo.appendChild(strongText);
		text = document.createTextNode(this.input);
		filterInfo.appendChild(text);
		
		// add remove button
		this.removeButton.appendChild(document.createTextNode("x"));
		this.removeButton.setAttribute("id", "button"+this.idName);
		this.removeButton.setAttribute("class", "deleteFilterButton");
		filterInfo.appendChild(this.removeButton);
		
		// append everything to the display panel
		el.appendChild(filterInfo);
		
	};
	
	
	// add listener for remove button
	cs441GoogleMapsViz.addEvent(this.removeButton, 'click', function() {
		buttonId = this.id;
		filterId = buttonId.substring(6); 
		
		// set isActive status to false
		cs441GoogleMapsViz.removeFilter(filterId);
		
		// update the filter drop down menu (add filter back)
		cs441GoogleMapsViz.filterMenu.update();

		//remove filter info box from the display panel
		infoBox = document.getElementById("infoBox"+filterId);
		el = document.getElementById("filterPanel");
		el.removeChild(infoBox);
	});


};