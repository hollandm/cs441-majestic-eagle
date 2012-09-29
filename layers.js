/*
 *  layers.js
 *
 *  A collection of methods for the application-specific Layer object,
 *  including the constructor for the Layer object. The methods control
 *  what portions of the layers are visible on the map.
 *
 *  @author Tanya L. Crenshaw
 */

/* Layer constructor
 *
 * For this application, a layer is a collection of information
 * that is handy to have in one place regarding a GoogleMaps
 * FusionTablesLayer object.  This constructor creates an object
 * to hold the methods for this object as well as all
 * this information:
 *
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
function Layer(ref, eID, map, zipName, filtered) {
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
		return filterByZip.call(this, zip);
	};
	this.toggleLayer = function(zip) {
		return toggleLayer.call(this, zip);
	};
}

/*
 * filterByZip()
 *
 * For the given layer, this function filters it
 * based on a given zip.
 *
 * @param zip The zipcode by which to filter the layer.
 */
function filterByZip(zip) {

	var filter = '' + this.zipName + ' = ' + zip;

	// Restrict the layer to view only the given zip.  Note
	// that placing 'map' in the options is equivalent to
	// calling 'setMap(map)' on a layer.  Thus, this layer
	// will be filtered and displayed on the map after
	// setting these options.
	this.ref.setOptions({
		query : {
			from : this.eID,
			where : filter
		},

		map : this.map
	});

	// Indicate that the layer is filtered
	this.filtered = true;

}

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
function toggleLayer(zip) {

	// If the layer is currently filtered, then show everything
	// in the layer.
	if(this.filtered === true) {

		// Show everything in the layer.
		this.ref.setOptions({
			query : {
				from : this.eID
			}
		});

		// Indicate that this layer is not being filtered.
		this.filtered = false;

	} else {

		this.filterByZip(zip);
		
		// TLC TODO: Trying to decide if this belongs in the 
		// function or here.  Right now, I'm doing both, which
		// is redundant....

		// Indicate that this layer is being filtered.
		this.filtered = true;

	}
}