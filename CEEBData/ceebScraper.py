#
# Description: This python file scrapes CEEB code data from the
# website "sat.collegeboard.org
#
# Input: None.
#
# Output: A .csv file containing every high school's name and CEEB
# number as reported by the SAT Collegeboard.
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
f = open("ceebcodes.csv", "w");

# Write the headers for the .csv data
f.write("High School Name, Code, State \n");

states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

urls = []

# Create an array of URLs, one per state
for state in states:
    urls.append("http://sat.collegeboard.org/register/sat-code-search-schools?decorator=none&submissionMode=ajax&pageId=registerCodeSearch&codeType=high-school-code&country=US&state="+state);

# Count which iteration of the loop we are in.
j = 0;

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
    schoolNames = soup.findAll(attrs={"class":"schoolResultCell"});
    
    # Get all of the div elements of the class "top-fs-desc"; that's where
    # all the school addresses are.
    codes = soup.findAll(attrs={"class":"codeResultCell"})

    # Assemble each entry
    for i in range(0, len(schoolNames)):
        f.write(schoolNames[i].contents[0][:-2] + ",") # The name of the school
 
        f.write(codes[i].contents[0][:-1] + ",") # The code that corresponds to the school

        f.write(states[j] ) # The state in which the school resides.

        f.write("\n")        

    j = j + 1;
        
# Close the file
f.close()


