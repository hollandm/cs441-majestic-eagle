# file: evalGPA 

# Written by: Tanya L. Crenshaw 

# Description: This R function processes .csv files in the current
# directory.  These .csv files are assumed to be UP admissions data,
# one .csv file for each year.  To "process" a .csv file, the average
# high school GPA for students applying to UP from the target city is
# calculated.  A data frame of mean GPAs per year for each zipcode in
# the target city is saved in an external file in the "auto"
# subdirectory.

# Assumption: The .csv files for the UP admissions data have been
# preprocessed such that the zipcode is a 5-digit numeric value and
# the special 4-digit code has been placed in another column.  In
# other words, what once was 97217-1524 is now 97217 in one column and
# 1524 in another.  This is easily done in Excel using the "Text to
# Columns" option. In whatever manner it is done, it is important to
# note that this preprocessing is not performed, but *expected* by
# this program.

# Warning: This function currently does not handle duplicate city
# names, like Springfield, OR and Springfield, IL.  However, the
# result will not be erroneous; simply GPA averages for all zipcodes
# for both cities for all years will be produced.

# To run the script in the R console, use:
# 
#  source("evalGPA.r");
#  result = evalGPA(<target city>);
#
# a file called gpa.csv will be created in the zipcode sub-directory
# in the "auto" sub-directory of the current directory.

# For example, running this R function for Livermore (California)
# produces two directories, one for each of the zipcodes 
# applying from that target city.

# // Currently in the "auto" subdirectory. 
# EN220-M14560-4:auto crenshaw$ more 94550/gpa.csv 
# "","meanGpa","total","numReported","year"
# "1",3.19,2,2,2007
# "2",3.4,3,1,2008
# "3",3.4125,5,4,2009
# "4",3.574,7,5,2010
# EN220-M14560-4:auto crenshaw$ more 94551/gpa.csv 
# "","meanGpa","total","numReported","year"
# "1",4.14,1,1,2007
# "2",3.78,2,2,2008
# "3",2.95,1,1,2009
# "4",3.42,2,1,2010


evalGPA <- function(city) {

  # initialize results vectors
  means = NULL;			# the mean GPA for a particular year
  years = NULL;			# the set of years
  totalApplicants = NULL;	# the total number of applicants
  reportingApplicants = NULL;	# the number of applicants who reported High School GPA

  allzips = NULL;     		# all the zipcodes for the target city

  # listz all the .csv files in this directory 
  filenames <- list.files(pattern=".csv$")
    
  # Open the set of .csv files, storing them in the vector
  # admissionsData.  Use $datset to add a last column entry
  # that will indicate which dataset is which.
  admissionsData <- c();

  for (i in filenames) {
    # load the .csv file
    u <- read.csv(i, header = TRUE, stringsAsFactors=FALSE);
    u$dataset <- i;
 
    # obtain the year
    years <- c(years, u$EntryYear[1]);
    
    admissionsData <- rbind(admissionsData, u);
  }

  # At this point, admissionsData holds all the data from all the
  # .csv files located in the current directory.  The vector years
  # holds the set of years (2007, 2008, etc) addressed in the
  # files.

  # gather all the zipcodes for the target city
  # across all of the files.  
  zips <- admissionsData$Zip[admissionsData$City == city, drop=TRUE];

  # convert the zips to a vector of numeric values
  zips <- as.numeric(as.character(zips)); 

  # collect them altogether
  allzips <- c(zips, allzips);

  # remove duplicates from allzips.  The variable allzips now contains the set of
  # zipcodes that applied to the university of portland from the target city for
  # all .csv files located in the current directory.  
  allzips <- unique(allzips);  

  # for each zipcode, calculate the average GPA for each year.
  for (j in allzips) {

    for(i in years) {

        # obtain the gpa scores for people in the target zipcode 
    	# who *applied* to the University of Portland
    	gpaScores <- admissionsData$HS_GPA[admissionsData$Zip == j & admissionsData$EntryYear == i & admissionsData$Applied=="Y", drop=TRUE];

    	# convert the result from R-factors to numeric values
    	gpaScores <- as.numeric(as.character(gpaScores));

    	# find the total number of applicants and append
    	totalApplicants <- c(totalApplicants, length(gpaScores));

    	# remove all blank entries from the vector
    	gpaScores <- gpaScores[!is.na(gpaScores)];

    	reportingApplicants <- c(reportingApplicants, length(gpaScores));

    	# calculate the mean and append 
    	means <- c(means, mean(gpaScores));
     }

  # create a data frame of results for this zipcode
  result <- (data.frame(meanGpa = means, total=totalApplicants, numReported=reportingApplicants,year=years));

  # construct the pathname in which to store the results
  path <- paste("auto/", j, sep="");

  # create a sub-directory in "auto" to store the results
  dir.create(path);

  # construct the filename in which to store the results
  filename <- paste(path, "/gpa.csv", sep="");

  # write the data frame to an external .csv file 
  write.csv(result,filename); 

  # reset the results for the next zipcode
  length(means) <- 0;
  length(totalApplicants) <- 0;
  length(reportingApplicants) <- 0;
  length(result) <- 0;

  }

  # return the final data frame of results
  return (result);

}