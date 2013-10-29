import urllib2
import json
import time

import csv
with open('/home/matt/Dropbox/college/Junior Fall/cs441/cs441-majestic-eagle/highSchoolData/SchoolsReferencedByStudentDB.csv', 'rb') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='|')


    count = 0
    for row in reader:

        if count > 1500:

            name =  row[0] + ", " +row[2]
            url="http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false" % name.replace(" ","+")

            try:
                response = urllib2.urlopen(url)
                jsongeocode = response.read()

                jsonArray = json.loads(jsongeocode)

                if jsonArray['status'] == 'OK':

                    lat = jsonArray['results'][0]['geometry']['location']['lat']
                    lng = jsonArray['results'][0]['geometry']['location']['lng']

                    print str(count) + ": " +name + ", " +str(row[1]) + "(" + str(lat) + ", " + str(lng) + ")"

                else:
                     print str(count) + ": No results found for " +name + ", " +row[1] + " because " + jsonArray['status']
            except:
                print str(count) + ": Failed request for " + name + ", " + row[1]

            time.sleep(0.2)


        count += 1

#address="1600+Amphitheatre+Parkway,+Mountain+View,+CA"
#url="http://maps.googleapis.com/maps/api/geocode/json?address=%s&sensor=false" % address
#
#response = urllib2.urlopen(url)
#jsongeocode = response.read()
#
#jsonArray = json.loads(jsongeocode)
#
#
#print jsonArray['results'][0]['geometry']['location']['lat']
#print jsonArray['results'][0]['geometry']['location']['lng']