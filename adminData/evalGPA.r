# file: evalGPA 

# Written by: Tanya L. Crenshaw 

# Description: This R function processes .csv files in the current
# directory.  These .csv files are assumed to be UP admissions data,
# one .csv file for each year.  To "process" a .csv file, the average
# high school GPA for students applying to UP from the target zipcode
# is calculated.  A data frame of mean GPAs per year for the target
# zipcode is returned as well as saved in an external file in the
# "auto" subdirectory.

# Assumption: The .csv files for the UP admissions data have been
# preprocessed such that the zipcode is a 5-digit numeric value and
# the special 4-digit code has been placed in another column.  What
# once was 97217-1524 is now 97217 in one column and 1524 in another.
# This is easily done in Excel using the "Text to Columns" option.

# To run the script use:
# 
#  source("evalGPA.r");
#  result = evalGPA(<target zipcode>);
#
# a file called gpa.csv will be created in the target zipcode
# sub-directory in the current directory.


evalGPA <- function(zipcode) {

  # initialize results vectors
  means = NULL;			# the mean GPA for a particular year
  years = NULL;			# the year
  totalApplicants = NULL;	# the total number of applicants
  reportingApplicants = NULL;	# the number of applicants who reported High School GPA

  # get all the .csv files in this directory 
  files <- list.files(pattern=".csv$")

  # for each .csv file, find the average GPA of students who applied in zip code 97303 
  for (i in files) {

    # load the .csv files of interest
    admissionsData = read.csv(i, header = TRUE, stringsAsFactors=FALSE);

    # obtain the gpa scores for people in zip code 97303
    # who *applied* to the university of portland
    gpaScores <- admissionsData$HS_GPA[admissionsData$Zip == zipcode & admissionsData$Applied=="Y", drop=TRUE];

    # convert the result from R-factors to numeric values
    gpaScores = as.numeric(as.character(gpaScores));

    # find the total number of applicants and append
    totalApplicants = c(totalApplicants, length(gpaScores));

    # remove all blank entries from the vector
    gpaScores = gpaScores[!is.na(gpaScores)];

    reportingApplicants = c(reportingApplicants, length(gpaScores));

    # calculate the mean and append 
    means = c(means, mean(gpaScores));

    # obtain the year
    year = admissionsData$EntryYear[1];

    # append the year to the vector of years
    years = c(years, year);
  }

  # create a data frame of results
  result = (data.frame(meanGpa = means, total=totalApplicants, numReported=reportingApplicants,year=years));

  # construct the pathname in which to store the results
  path <- paste("auto/", zipcode, sep="");

  # create a sub-directory in "auto" to store the results
  dir.create(path);

  # construct the filename in which to store the results
  filename <- paste(path, "/gpa.csv", sep="");

  # write the data frame to an external .csv file 
  write.csv(result,filename); 

  # return the data frame of results
  return (result);

}