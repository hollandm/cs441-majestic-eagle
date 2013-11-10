
var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

cs441GoogleMapsViz.FilterInfoBox = function(idName, input) {
	this.idName = idName;
	this.input = input;
	this.removeButton = document.createElement("button");

	this.createInfoBox = function() {
		el = document.getElementById("filterPanel");	
		filterInfo = document.createElement("div");
		filterInfo.setAttribute("id", "infoBox"+this.idName);
		filterInfo.setAttribute("class", "filterMenuDisplay");
 		text = document.createTextNode(this.idName+ ": ");
		strongText = document.createElement("strong");
 		strongText.appendChild(text);
 		filterInfo.appendChild(strongText);
		text = document.createTextNode(this.input);
		filterInfo.appendChild(text);
		
		// add remove button
		this.removeButton.appendChild(document.createTextNode("x"));
		this.removeButton.setAttribute("id", "button"+this.idName);
		filterInfo.appendChild(this.removeButton);
		
		el.appendChild(filterInfo);
		
	};
	
	
	// add listener for remove button
	cs441GoogleMapsViz.addEvent(this.removeButton, 'click', function() {
		buttonId = this.id;
		filterId = buttonId.substring(6); 
		cs441GoogleMapsViz.removeFilter(filterId);
		cs441GoogleMapsViz.filterMenu.addFilter(filterId);

		//remove filter info box
		infoBox = document.getElementById("infoBox"+filterId);
		el = document.getElementById("filterPanel");
		el.removeChild(infoBox);
	});


};