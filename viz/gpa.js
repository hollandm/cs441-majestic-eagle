// Name: gpa.js
// Description:	A script to import data from adminData/97303/gpa.csv and 
// render it as a barchart.
// Written by: 	Tanya L. Crenshaw

	// The following line is useful for debugging.
	console.log("This is an example of logging information to the console");
	  
	  
	// Import the data from the .csv file, applying the callback
	// function to the data array, data, produced by the file.
	d3.csv("adminData/auto/97303/gpa.csv", function(data) {

		// Hereth begin the body of the callback function for
		// the .csv() call.

  		// Apply the forEach() callback function to the
  		// data array.  Convert each entry in the meanGpa
  		// column to a number.
  		// 
  		// Note that Array object callbacks are not
  		// standard and may not work in IE8 
  		data.forEach(function(d) {
    	   d.meanGpa = +d.meanGpa;
	    });
	    
    	// From the html body, select the .rightSide container to be the 
 		// parent of the new container whose class is "chart".  
		// The class attribute allows the .css style information
		// to be applied to the container.
		var bar = d3.select(".rightSide")
   	   		.append("div")
   	   		.attr("class", "bar") 

	    
  	   // Each datum is a container of class type "bar".  
	   // For each datum, append a container, bind the data to the container
	   // using the .data() function and apply the style and text attributes.
   	   bar.selectAll("div")
         .data(data)
   	     .enter().append("div")
         .style("width", function(d) { return d.meanGpa * 30 + "px"; })
         .text(function(d) { return d.meanGpa; })

	   // Apply a similar operation to the labels.
	   var label = d3.select(".leftSide")
  	      .append("div")
	      .attr("class","label")
	  
	     label.selectAll("div")
		   .data(data)
		   .enter().append("div")
              .text(function(d) {return d.year})
		
});