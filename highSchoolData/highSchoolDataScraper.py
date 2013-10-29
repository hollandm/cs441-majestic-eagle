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
f = open("HighSchools_raw.csv", 'w')

# Write the headers for the .csv data
f.write("High School, StreetAddress, City, State, Zip\n")


# Create a list of links to scrape for the state of Oregon.
urls = []
states = [
"Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"
]


for state in states:    
    urls.append("http://www.directoryofschools.com/high-schools/"+state+".html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-2.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-3.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-4.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-5.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-6.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-7.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-8.html")
    urls.append("http://www.directoryofschools.com/high-schools/"+state+"-High-Schools-9.html")

# Parse each url and extract a list of high schools.
for page in urls:
    # Load the page; This loads all of the HTML that the URL points
    # to.

    try:
        page = urllib2.urlopen(page)
    except:
        continue

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
        try:
            f.write(schoolNames[i+2].string + ",")  # The name of the high school
        except:
            print "Cant Write " + schoolNames[i+2].string + "\n"

        try:
            f.write(schoolAddrs[i].contents[0] + "," + schoolAddrs[i].contents[2]) # The address information
        except:
            try:
                f.write(schoolAddrs[i].contents[0] + "," + schoolAddrs[i].contents[1]) # The address information
            except:
                print str(i)

        # This might be an extra-long entry.  
        #if len(schoolAddrs[i].contents) > 7:
        #       f.write("," + schoolAddrs[i].contents[4])
            
        f.write("\n")        
        
# Close the file
f.close()


