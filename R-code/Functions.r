# Built-in functions 

# create a sequence of numbers frm 32 to 44.
print(seq(32, 44))

# find mean of numbers from 25 to 82.
print(mean(25:82))

# Find sum of numbers from 41 to 68.
print(sum(41:68))

# User-defined functions

# function to calculate square of a number
new.function <-function(a){
    for(i in 1:a){
        b<- i^2
        print(b)
    } 
}
new.function(6)

# Data frames

# Program to join columns and rows in a dataframe.
Name<- c("Shubhan Rastogi", "Aarav Sharma", "Anika Singh", "Riya Mehta")
Address<- c("Delhi", "Mumbai", "Kolkata", "Chennai")
Marks<- c(85, 92, 88, 76)
info <- cbind(Name, Address, Marks))
print(info)

new.studinfo <- data.frame(
    Name =c("Deepak Kumar", "Sneha Gupta", "Karan Patel", "Pooja Joshi"),
    Address =c("Bangalore", "Hyderabad", "Pune", "Ahmedabad"),
    Marks =c(89, 94, 91, 78)
    stringsAsFactors=FALSE
)
cat("### New Data Frame ###\n")
print(new.studinfo)

all.info <- rbind(info, new.studinfo)
cat("### Combined Data Frame ###\n")
print(all.info)

# String Manipulaton Functions

# String concatenation
str <- paste("R", "is", "a", "programming", "language")
print(str)
str <- cat("R", "is", "a", "programming", "language", sep=":")
print(str)
