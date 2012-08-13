#!/bin/bash
# Name:        convertShpToKml.sh
#
# Description: This bash script converts all .shp files in the current
# directory to a .kml file using the GDAL ogr2ogr tool.  
#
# Written by:  Tanya L. Crenshaw
# Date:        August 8, 2012
# Note:        To install GDAL on the Mac using macports:
# 
# $ port install gdal
#
for file in *.shp 
do

    # Separate the filename from the .shp filename designation.
    filename=${file%%.*}
    
    # Provide informational message
    echo "Converting $file to $filename.kml"

    # Convert each file
    ogr2ogr -f KML $filename.kml $file
done