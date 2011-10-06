// Name: gpa.js
// Description:	A script to import data from adminData/97303/gpa.csv and 
// render it as a barchart in an svg container.
// Written by: 	Tanya L. Crenshaw


	  
	// Some prelimiaries on the dimensions of the svg container.
	var m = 20,    // margin between the bottom of the bars and the bottom of the container.
	  	w = 250,   // width of container
	  	h = 100,   // height of container
	  	s = 5;     // space between the bars in barchart.

	    
	// Import the data from the .csv file, applying the callback
	// function to the data array, data, produced by the file.
	d3.csv("adminData/auto/97303/gpa.csv", function(data) {

		// Hereth begin the body of the callback function for
		// the .csv() call.  It contains all that will be done
		// to the data in order to transform it and render 
		// it on the browser.

	    
	    // In the existing #info container, append an svg
	    // container in which the data will be rendered
	    // as svg rectangles.  The width and height of
	    // the svg container are specified here, rather
	    // than some .css file.
	    var vis = d3.select("#info")
		  .append("svg:svg")
		  .attr("width", w)
		  .attr("height", h);	  


  		// Apply the forEach() callback function to the
  		// data array.  Convert each entry in the meanGpa
  		// column to a number.
  		// 
  		// Note that Array object callbacks are not
  		// standard and may not work in IE8 
  		data.forEach(function(d) {
    	   d.meanGpa = +d.meanGpa;
    	   d.item = +d.item;
	    });

		// DETERMINE SIZE OF BARS:	    

		// Each bar in the bar graph is an svg rectangle.  To
		// draw a rectangle, one needs the x and y position of
		// the corner of the rectangle.  The size and location 
		// of the bars is a function of the size of the svg 
		// container as well as the data itself.  
		
		// In svg, a rectangle is defined by the x, y of the
		// top-left corner of the rectangle, and the "height"
		// of the rectangle as it grows down the screen.
		
		// Get the maximum value in the "meanGpa" column of 
	    // the .csv file that was loaded.
	    maxy = d3.max(data, function(d) {
	    	return d.meanGpa;
	    });
	    
	    // Round up the maximum value to the next integer
	    maxy = Math.ceil(maxy);
		
		// The y-position of the rectangle's topside is a
		// function of the meanGpa value of the data and the
		// height of the svg container.
        var y = function(d) { return (h - (d.meanGpa * h / maxy)); };

	    // The width of the rectangle is a function of
	    // the number of data minus the desired space
	    // between the bars.
	    var rw = w / d3.max(data, function(d) { return d.item; }) - s;
        	    
	    // The x-position of the rectangle is a function of the 
	    // item number of the data, rectangle's width, and
	    // the desired space between the bars.
    	var x = function(d) { return ((d.item - 1) * (rw + s)); };

		// The height of the rectangle is a function of the
		// meanGpa value of the data and the height of the svg
		// container.
	    var rh = function(d) { return (d.meanGpa * h / maxy); };
	   
	   // CREATE CONTAINERS FOR BARS:
	   // For each datum, create a g container and a rectangle in that container
	   // something like:
	   //   <g class="bar" style="fill: #7592D3 ...;"       
	   //      <rect width = ...            
       var bars = vis.selectAll("g.bar")
         .data(data)
         .enter().append("svg:g")
         .attr("class", "bar")
         .style("fill", "#7592D3")
         .attr("transform", function(d) { return "translate(" + x(d) + "," + y(d) + ")"; });
         
         
       // For each bar in the barchart: 
       // - the width of the bar is a function of the number of data.
       // - the y-position of the bar is the top-left corner.
       bars.append("svg:rect")
         .attr("width", rw )
         .attr("x", 0)
         .attr("y", 10)
         .attr("height", function(d) {return (d.meanGpa * h / maxy);})
         
       // Done drawing bars.
       
       // Now for the labels.  Stay tuned.
	       
       
	
});