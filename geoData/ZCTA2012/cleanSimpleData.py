#
# Name:       cleanSimpleData.py
#
# Description: This python file cleans up the SimpleData fields that
# are in the US Census Bureau-supplied ZCTA files.
#
# Input: a .kml file, converted from the original US Census Bureau
# shapefile, .shp.  This .kml file contains a bunch of messy and
# uninteresting SimpleData fields.  For example:
#
#
# <?xml version="1.0" encoding="utf-8" ?>
# <kml xmlns="http://www.opengis.net/kml/2.2">
# <Document><Folder><name>tl_2010_41_zcta510</name>
# <Schema name="tl_2010_41_zcta510" id="tl_2010_41_zcta510">
# 	<SimpleField name="Name" type="string"></SimpleField>
#	<SimpleField name="Description" type="string"></SimpleField>
#	<SimpleField name="STATEFP10" type="string"></SimpleField>
#	<SimpleField name="ZCTA5CE10" type="string"></SimpleField>
# ...
# </Schema>
# ...
# <ExtendedData><SchemaData schemaUrl="#tl_2010_41_zcta510">
# 		<SimpleData name="STATEFP10">41</SimpleData>
#		<SimpleData name="ZCTA5CE10">97833</SimpleData>
#		<SimpleData name="GEOID10">4197833</SimpleData>
# ...
#
# Output: a .kml file, now with a smaller Schema with SimpleFields
# that are relevant to an admissions unit user.  For example:
# 
# <kml xmlns="http://www.opengis.net/kml/2.2">
# <Document><Folder><name>tl_2010_41_zcta510</name>
# <Schema id="tl_2010_41_zcta510" name="tl_2010_41_zcta510">
#   <SimpleField name="State" type="string" />
#   <SimpleField name="Zip Code Area" type="string" />
# </Schema>
# ...
from xml.etree import ElementTree as ElementTree

# Step 0. Register a namespace for the ElementTree object.  
# 
# Without this line, the default namespace of ns0: is used, and the
# output looks like this:
#
# <ns0:kml xmlns:ns0="http://www.opengis.net/kml/2.2">
#
# Note that the namespace must be registered before any XML data
# is read into memory.
#
ElementTree.register_namespace("","http://www.opengis.net/kml/2.2")

# Step 1.  Read in the data.
# Create an ElementTree object and parse an input file so that we may
# manipulate a .kml file in memory.
tree = ElementTree.parse("smallTestFile.kml")

# Get the root element of the resulting tree.  The root element
# is the entire wad of XML that was just parsed.
root = tree.getroot()

# Step 2.  Alter the Schema

# Locate the Schema element
se = tree.find('.//{http://www.opengis.net/kml/2.2}Schema')

sname = se.get("name")
sid = se.get("id")

# Create an iterator for the root element, with the intention of
# iterating over each child element tagged with the specified string.
iter = root.iter('{http://www.opengis.net/kml/2.2}Schema')

for element in iter:

    print element.tag
    element.clear()

# Now that the old Schema has been deleted, reset the name and ID, and
# add subelements to the Schema element.  These new subelements are
# the new fields for our Schema.
se.set("name",sname)
se.set("id",sid)

# Add some tabs, spaces, and carriage returns for prettier printing
se.text = "\n\t"
se.tail = "\n  "

s1 = ElementTr
s2 = ElementTree.SubElement(se,"{http://www.opengis.net/kml/2.2}SimpleField", name="Description", type="string")
s3 = ElementTree.SubElement(se,"{http://www.opengis.net/kml/2.2}SimpleField", name="State", type="string")
s4 = ElementTree.SubElement(se,"{http://www.opengis.net/kml/2.2}SimpleField", name="ZipCodeArea", type="string")

s1.tail = "\n\t"
s2.tail = "\n\t"
s3.tail = "\n\t"
s4.tail = "\n"

# Step 3.  Alter the SchemaData for each Placemark (i.e., ZCTA)

# Create an iterator for the root element, with the intention of
# iterating over each child element tagged with the specified string.
iter = root.iter('{http://www.opengis.net/kml/2.2}SchemaData')

for element in iter:

    sd = element.findall('.//{http://www.opengis.net/kml/2.2}SimpleData')

    state = sd[0].text   # Get the STATEFP10 text, it's the first field.
    zip = sd[1].text     # Get the ZCTA5CE10 text, it's the second field.

    element.clear()

    # Create the new fields
    s1 = ElementTree.SubElement(element,"{http://www.opengis.net/kml/2.2}SimpleData", name="State")
    s2 = ElementTree.SubElement(element,"{http://www.opengis.net/kml/2.2}SimpleData", name="ZipCodeArea")

    # Add the data previously read from the old fields to the new fields that were
    # just created.
    s1.text = state 
    s2.text = zip 

    # Add some tabs and carriage returns for prettier printing
    s1.tail = "\n\t\t"
    s2.tail = "\n\t"
    
    element.text = "\n\t\t"

# Step 4.  Restore the schemaUrl attribute to each SchemaData element

# Create an iterator for the root element, with the intention of
# iterating over each child element tagged with the specified string.
iter = root.iter('{http://www.opengis.net/kml/2.2}SchemaData')

sUrl = "#" + sname

for element in iter:
    element.set("schemaUrl",sUrl)


# Step 5.  Write the result to an output file
print ("Creating output 'output.kml'")
tree.write("output.kml", encoding="utf-8", xml_declaration=True, method="xml")

    






