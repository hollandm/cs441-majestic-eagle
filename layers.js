/*
 *  layers.js
 *
 *  A collection of methods for the application-specific Layer object,
 *  including the constructor for the Layer object. The methods control
 *  filtering, or what portions of the layers are visible on the map.
 *
 *  @author Tanya L. Crenshaw
 */

/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

/* Layer constructor
 *
 * For this application, a layer is a collection of information
 * that is handy to have in one place regarding a GoogleMaps
 * FusionTablesLayer object.  This constructor creates an object
 * to hold the methods for this object as well as all
 * this information:
 *
 * @param name The name of the layer, e.g. "school", "zip", or "student".
 * @param ref A reference to the FusionTablesLayer object.
 * @param eID The encrypted ID of the layer.
 * @param map The map on which the layer is being filtered.
 * @param zipName The name of the column in the Fusion Table
 * that represents the zip code.
 * @param filtered A boolean value indicating whether the
 * layer is currently being filtered.
 *
 * @returns void
 */
cs441GoogleMapsViz.Layer = function(name, ref, eID, map, zipName, filtered) {
	this.name = name;
	this.ref = ref;
	this.eID = eID;
	this.map = map;
	this.zipName = zipName;
	this.filtered = filtered;

	// TLC TODO: For every object that gets created, a copy of this
	// function is saved to the object.  It would be better to
	// alter the prototype for the Layer object so that there is only
	// one copy of this.  Need to figure out an elegant way to do this.
	// But for now, the application only has two layers, so this is
	// okay for now.
	this.filterByZip = function(zip) {
		return cs441GoogleMapsViz.filterByZip.call(this, zip);
	};
	this.toggleLayer = function(zip) {
		return cs441GoogleMapsViz.toggleLayer.call(this, zip);
	};

	this.applyFilter = function(newEID, select, predicate) {
		return cs441GoogleMapsViz.applyFilter.call(this, newEID, select, predicate);
	};
};
/*
 * applyFilter()
 *
 * For the given layer, this function filters it based on a given
 * encypted ID, a table column name, and a filtering predicate.
 * The rationale behind this little function is to avoid copy-pasting
 * the Google Maps FusionTable Layer setOptions() method call all
 * over the place.
 *
 * @param newEID The enccrypted id for the table that should be
 * associated with this layer.  Set this parameter to null
 * if the EID doesn't need to change.  If this parameter is not null,
 * the layer object's eID property is updated with this parameter's
 * value.
 *
 * @param column The "select" portion of the query to filter the layer.
 * Set this parameter to null if there is no select portion of the
 * query.
 *
 * @param predicate The "where" portion of the query to filter the
 * layer. If this parameter is null, then no filtering is taking place,
 * and the layer object's filtered property is set to false.  If this
 * parameter is not null, then the layer object's filtered property is
 * set to true.
 *
 * @return void
 */
cs441GoogleMapsViz.applyFilter = function(newEID, column, predicate) {

	// Check if newEID is null.
	if(newEID != null) {
		// Update the EID of the filter with the newEID.
		this.eID = newEID;

	}
	
	console.log(this);
	console.log(this.ref);

	// Note that placing 'map' in the options is equivalent to
	// calling 'setMap(map)' on a layer.  Thus, this layer
	// will be filtered and displayed on the map after
	// setting these options.
	this.ref.setOptions({
		query : {
			select : column,
			from : this.eID,
			where : predicate
		},

		map : this.map
	});

	// Update the filtered property for this object.
	if(predicate == null) {
		// Indicate that the layer is not filtered.
		this.filtered = false;
	} else {
		// Indicate that the layer is filtered
		this.filtered = true;
	}
}
/*
 * filterByZip()
 *
 * For the given layer, this function filters it
 * based on a given zip.
 *
 * @param zip The zipcode by which to filter the layer.
 */
cs441GoogleMapsViz.filterByZip = function(zip) {

	var filter = '' + this.zipName + ' = ' + zip;

	this.applyFilter(null, null, filter);

};
/*
 * filterByCEEB()
 *
 * For the given layer, this function filters it
 * based on a given CEEB.
 *
 * @param ceeb The CEEB by which to filter the layer.
 */
cs441GoogleMapsViz.filterByCEEB = function(ceeb) {

	var filter = ''  + ' Code = ' + ceeb;
	
	this.applyFilter(null, null, filter);
};
/*
 * filterByRegion()
 *
 * For the given layer, this function filters it based
 * on a given region.
 *
 */
cs441GoogleMapsViz.filterByRegion = function(region) {

	var state = cs441GoogleMapsViz.convertRegionToState(region);
	var filter = "";
	
	// What is the name of the layer?  Get the name of the layer
	// so that the filter is constructed correctly.  In the zips
	// tables, the state is a number.  In the schools tables, the
	// state is a two-letter acronym.
	if(this.name == "zips") {
		var stateNumber = cs441GoogleMapsViz.convertStateToUSBNumber(state);
		filter = 'State = ' + stateNumber;	
	}
	if(this.name == "schools") {
		filter = "State = '" + state + "'"; 
	}

	// Get the encrypted ID, using the name of the layer to index the
	// giant object containing encrypted IDs.
	newEID = cs441GoogleMapsViz.tables[this.name][state];

	// A little debugging information, as region filtering takes some
	// time, and it helps to know if the choices were actually
	// registered and converted.
	console.log(region);
	console.log(state);
	console.log(filter);
	console.log(newEID);

	this.applyFilter(newEID, state, filter);

};
/*
 * toggleLayers()
 *
 * For the given Layers, this function toggles its
 * view.  If the layers is currently filtered, it removes the filter
 * and displays the whole of the layer.  If the layer is not filtered,
 * it filters it according to the zipcode.
 *
 * @param map The Google Map upon which to operate.
 * @param layers A collection of layers upon which to operate.
 * @return void
 *
 */
cs441GoogleMapsViz.toggleLayer = function(zip) {

	// If the layer is currently filtered, then show everything
	// in the layer.
	if(this.filtered === true) {

		// Turn off all filters.
		this.applyFilter(null, null, null);

	} else {

		// Filter this layer by zipcode.
		this.filterByZip(zip);

	}
};
