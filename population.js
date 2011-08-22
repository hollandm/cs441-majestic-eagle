	// Declare the data.
 	var data = [9.7, 11.53, 26.99, 27.96, 6.55, 12.26, 5.01]
	
	// Select the html body to be the parent of the 
	// new container whose class is "chart".  The class
	// attribute allows the .css style information
	// to be applied to the container.
	var chart = d3.select("body")
	 .select(".info")
     .append("div")
     .attr("class", "chart");

	// Each datum is a chart element.  For each datum, append an elements
	// applying the style and text attributes.
   	chart.selectAll("div")
     .data(data)
   	 .enter().append("div")
       .style("width", function(d) { return d * 10 + "px"; })
       .text(function(d) { return d; });
