#
# Description: This python file scrapes Oregon high school information
# from the website "www.directoryofschools.com".
#
# Input: None.
#
# Output: A .csv file containing every Oregon high school; its name
# StreetAddress, City, State, and Zip.  Note that the corrections made
# to the data scraped do not create a perfect file.  Some manual
# corrections are required.  For example, in some cases converting
# "Oregon" to "OR" screws up listings for Oregon City.
# 
# Here is a list of all schools that require manual fixing after this
# program is complete:
#
#  Burns High School - 1100 Oregon Ave 
#  Culver High School - Has no address.  Realign columns.
#  Joseph High School - Has no address.  Realign columns.
#  Oregon City Senior High School - All instances of "Oregon City" are "OR"
#  Pilot Rock High School - Extra comma.  Realign columns.
#  St. Helens High School - Appears twice.
#
# Perhaps is seems like a lot of corrections, but there is a balance
# between the amount of time it takes to write this program and the
# time it takes to make these corrections.
#
# Based on the data scraping tutorial provided in the book "Visualize
# This" by Nathan Yau.
#
# Requires: Beautiful Soup Python Library.
#
#           
import urllib2, re
from bs4 import BeautifulSoup

# Open a file to write .csv data
f = open("OregonHighSchools_raw.csv", 'w')

# Write the headers for the .csv data
f.write("High School, StreetAddress, City, State, Zip\n")

# Create a list of links to scrape for the state of Oregon.
urls = []
urls.append("http://www.directoryofschools.com/high-schools/oregon.htm")
urls.append("http://www.directoryofschools.com/high-schools/Oregon-High-Schools-2.html")
urls.append("http://www.directoryofschools.com/high-schools/Oregon-High-Schools-3.html")
urls.append("http://www.directoryofschools.com/high-schools/Oregon-High-Schools-4.html")


# Parse each url and extract a list of high schools.
for page in urls:
    # Load the page; This loads all of the HTML that the URL points
    # to.
    page = urllib2.urlopen(page)
    
    # Use BeautifulSoup to parse the page.  The raw HTML is now stored as
    # a collection of elements that are much easier to work with.
    soup = BeautifulSoup(page)
    
    # Get all of the strong elements; that's where all the school names are.
    # Note that the first two strong elements on the page are decorative.
    schoolNames = soup.findAll("strong")
    
    # Get all of the div elements of the class "top-fs-desc"; that's where
    # all the school addresses are.
    schoolAddrs = soup.findAll(attrs={"class":"top-fs-desc"})
    
    # Assemble each entry
    for i in range(0, len(schoolNames)-2):
        f.write(schoolNames[i+2].string + ",")  # The name of the high school
 
        f.write(schoolAddrs[i].contents[0] + "," + schoolAddrs[i].contents[2]) # The address information
     
        # This might be an extra-long entry.  
        if len(schoolAddrs[i].contents) > 7:
               f.write("," + schoolAddrs[i].contents[4])
            
        f.write("\n")        
        
# Close the file
f.close()

# Reopen the file and do some corrections.  The data scraped from
# these websites do not have consistent formatting.
input = open("OregonHighSchools_raw.csv", 'r')
output = open("OregonHighSchools_clean.csv","w")

# The search pattern for one of the file corrections below is "P O
# Box" followed by any set of decimal values.  Note that the website
# isn't consistent with P.O. or PO or whatever so all possibilities
# are represented.  There's probably a better way to represent this
# with a regex in Python, but I think this is more readable. 
pattern= re.compile("P. O. Box \d*|PO Box \d*|P O Box \d*|P.O. Box \d*|PO Box BB|P.O. Box W|PO, Box \d*") 

# Plow through the file line by line, making corrections.
for line in input:

    # Correction.  Replace any instance of ",," with ","
    line = line.replace(",,",",")

    # Correction.  Replace any instance of Oregon with OR
    line = line.replace("Oregon","OR")

    # Correction.  Replace any instance of OR with OR, so that the zipcode is
    # in its own column in .csv.
    line = line.replace("OR","OR,")

    # Correction.  Some schools have both a street address and
    # P.O. Box listed while other schools have only a P.O. Box.
    # Unconditionally remove all P.O. Boxes.  This means that some
    # high schools will have no street address, but the essential data
    # for my purpose is zipcode.
    line = re.sub(pattern, "", line)

    # Correction. If a PO Box was removed, there might be an extra
    # comma, so again replace any instance of ",," with ","
    line = line.replace(",,",",")
    line = line.replace(", ,",",")

    output.write(line)


# Corrections complete.  Close the file.
f.close()
