/*
 * cityInformation.js
 *
 * A centralized array of city names, geographical centers, and their
 * corresponding zipcodes.  The city centers were obtained manually 
 * from wunderground.  The number of applications were obtained 
 * manually from R.  The zipcodes were obtained manually from 
 * http://www.city-data.com.   
 * 
 * Note: This file is currently not used by the application.  It is 
 * retained in the repository as a mediocre example of how one might
 * organize such city information. 
 */
	var cities = {}
	
    cities['beaverton'] = {
        center: new google.maps.LatLng(45.479686, -122.809954),
        applications: 490,
        zipcodes: [97005, 97006, 97007, 97008, 97075, 97076, 97077, 97078]
    };

    cities['honolulu'] = {
        center: new google.maps.LatLng(21.308950, -157.826182),
        applications: 524,
        zipcodes: [96801, 96802, 96803, 96804, 96805, 96806, 96807, 96808, 96809, 96810, 96811, 96812, 96813, 96814, 96815, 96816, 96817, 96818, 96819, 96820, 96821, 96822, 96823, 96824, 96825, 96826, 96827, 96828, 96830, 96835, 96836, 96837, 96838, 96839, 96840, 96841, 96842, 96843, 96844, 96845, 96846, 96847, 96848, 96849, 96850]
    };
    
    cities['portland'] = {
        center: new google.maps.LatLng(45.523040, -122.640155),
        applications: 1455,
        zipcodes: [97201, 97202, 97203, 97204, 97205, 97206, 97207, 97208, 97209, 97210, 97211, 97212, 97213, 97214, 97215, 97216, 97217, 97218, 97219, 97220, 97221, 97222, 97223, 97224, 97225, 97227, 97228, 97229, 97230, 97231, 97232, 97233, 97236, 97238, 97240, 97242, 97251, 97253, 97254, 97255, 97256, 97258, 97259, 97266, 97267, 97268, 97269, 97271, 97272, 97280, 97281, 97282, 97283, 97286, 97290, 97291, 97292, 97293, 97294, 97296, 97298, 97299]
    };
    
    cities['seattle'] = {
        center: new google.maps.LatLng(47.6740, -122.2882),
        applications: 945,
        zipcodes: [98060, 98101, 98102, 98103, 98104, 98105, 98106, 98107, 98108, 98109, 98111, 98112, 98114, 98115, 98116, 98117, 98118, 98119, 98121, 98122, 98124, 98125, 98126, 98129, 98130, 98131, 98132, 98133, 98134, 98136, 98138, 98140, 98144, 98145, 98146, 98148, 98150, 98151, 98154, 98155, 98158, 98160, 98161, 98164, 98166, 98168, 98171, 98174, 98177, 98178, 98181, 98184, 98185, 98188, 98190, 98191, 98195, 98198, 98199]
    };

    cities['spokane'] = {
        center: new google.maps.LatLng(47.66, -117.43),
        applications: 302,
        zipcodes: [99201, 99202, 99203, 99204, 99205, 99206, 99207, 99208, 99209, 99210, 99211, 99212, 99213, 99214, 99215, 99216, 99217, 99218, 99219, 99220, 99223, 99224, 99228, 99251, 99252, 99256, 99258, 99260, 99299]
        
	};
    
// Return information on a single city, given the cityname.
function cityLookup(cityname)
{
 	return cities[cityname];   
}

// Return information on all cities.
function cityDirectory()
{
 	return cities;
}
