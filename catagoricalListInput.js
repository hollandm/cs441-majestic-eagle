/**
 * databases.js
 * 
 * This file contains code for the project to reference and access the databases 
 * 
 * @author Matt Holland
 * @since November 11th, 2013
 */


/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapViz = cs441GoogleMapsViz || {};


cs441GoogleMapViz.catagoricalList = [];


//TODO: Tab autocomplete

/**
 * setCatagoricalList
 * 
 * Stores an input list so that it can be used to populate the catagorical filter input list
 * 
 * @param list: the list to set it as
 */
cs441GoogleMapViz.setCatagoricalList = function(list) {
	cs441GoogleMapViz.catagoricalList = list;
	
	cs441GoogleMapViz.refreshCatagoricalInput();
}

/**
 * setHSCatagoricalList
 * 
 * Stores the high schools in the UP database as a list that we can reference for populating the catagorical filter input list
 */
cs441GoogleMapViz.setHSCatagoricalList = function() {
	
	var schoolNames = [];
	
	for (var ceeb in cs441GoogleMapsViz.highSchools) {
		var school = cs441GoogleMapsViz.highSchools[ceeb].name;
		
		if (schoolNames.indexOf(school) >= 0) {} 
		else {
			schoolNames.push(school);	
		}
		
	}
	
	schoolNames = schoolNames.sort();
	
	
	// cs441GoogleMapViz.catagoricalList = schoolNames;
	
	cs441GoogleMapViz.setCatagoricalList(schoolNames);
}


/**
 * setMajorCatagoricalList
 * 
 * Stores the majors of UP as a list that we can reference for populating the catagorical filter input list
 */
cs441GoogleMapViz.setMajorCatagoricalList = function() {
	
	var majorNames = [];
	
	for (var major in cs441GoogleMapsViz.majorCodes) {
		
		if (majorNames.indexOf(major) >= 0) {} 
		else {
			majorNames.push(major);	
		}
		
	}
	
	majorNames = majorNames.sort();
	
	cs441GoogleMapViz.setCatagoricalList(majorNames);
	// cs441GoogleMapViz.catagoricalList = majorNames;
}

/**
 * refreshCatagoricalList
 * 
 * refreshes the contents of the catagorical selection list based on the current text of the input
 * after the last comma
 */
cs441GoogleMapViz.refreshCatagoricalInput = function() {
	
	//get the text in the input box
	var input = document.getElementById("filterInputs").value;
	
	var inputItems = input.split(",");
	
	//and lets find the item currently being typed
	var current = inputItems.slice(-1)[0].toLowerCase();

	//now find the select element that we have our items in
	var select = document.getElementById("catagoricalItemList");
	
	//and remove all existing items
	while (select.firstChild) {
	    select.removeChild(select.firstChild);
	}
	
	// cs441GoogleMapViz.catagoricalList = cs441GoogleMapsViz.majorCodes;
	
	//and add the updated items
	optionsList:
	for(var listItemIndex in cs441GoogleMapViz.catagoricalList) {
		
		var listItem = cs441GoogleMapViz.catagoricalList[listItemIndex];
		//check that we arn't displaying items already in the list
		for (var inputItemIndex=0; inputItemIndex<inputItems.length-1; ++inputItemIndex) {
			if (inputItems[inputItemIndex].trim() === listItem) {
				continue optionsList;
			}
		}
		
		//If the item begins with the same letters that the user typed
		if (listItem.toLowerCase().indexOf(current.trim()) == 0) {
			
			//then add a catagorical select list item for that item
			var option = document.createElement("option");
			option.setAttribute("id", listItem);
			
			//TODO: figure out how to make the items in the select smaller, currently they are going off the edge
			
			option.setAttribute("class", "catagoricalSelectItem");
			option.setAttribute("value", listItem);
			option.setAttribute("title", listItem);
			
			option.setAttribute("label", listItem);
			option.setAttribute("onClick", "cs441GoogleMapViz.clickCatagoricalInput()");
			select.appendChild(option);
			
		}
		
	}
}


/**
 * clickCatagoricalInput
 * 
 * once an item in the catagorical input is clicked, update the filter text with the item that was clicked
 * in the catagorical select list
 */
cs441GoogleMapViz.clickCatagoricalInput = function() {
	
	
	//get the input box
	var filterInput = document.getElementById("filterInputs");
	
	//find each item in that list, seperated by commas
	var items = filterInput.value.split(",");
	
	//find the select element that we have our items in
	var select = document.getElementById("catagoricalItemList");
	
	//find the selected element in the select object
	var selected = select.value;
	
	//replace the partially typed string with the fully typed string
	items[items.length-1] = selected;

	//put the array back of items back into a string
	var outputString = items.join(", ");
	
	//update the string dispalyed on the screen with the one we just updated
	filterInput.value = outputString;
	
	//make the text box regain focus
	filterInput.focus();
}


