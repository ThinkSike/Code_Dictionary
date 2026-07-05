# Q4. Functions in R 
# 1. Write a user-defined function to calculate: 
#     o Mean, median, and standard deviation of a numeric column. 
# 2. Call the function for two different columns. 
# 3. Write a function to find maximum and minimum values. 
# 4. Pass dataset column as an argument to the function. 
# 5. Display function output in readable format.

# sales <- read.csv("sales.csv")
# superstore <- read.csv("Superstore.csv", encoding = "latin1")
# covid <- read.csv("covid.csv")
# student <- read.csv("student-mat.csv")
# airline <- read.csv("airline.csv")

# 1
stats_function <-function(column){
    mean_val <- mean(column, na.rm=TRUE)
    median_val <-median(column, na.rm=TRUE)
    sd_val <- sd(column, na.rm=TRUE)
    list(
    Mean = mean_val,
    Median = median_val,
    SD = sd_val
  )       
}
   
# 2
stats_function(sales$Sales)
stats_function(airline$Passengers)

# 3
min_max_function <- function(column){
    list(
        Maximum = max(column),
        Minimum = min(column)
    )
}

# 4
min_max_function(covid$Confirmed)

# 5
result <- stats_function(sales$Sales)
print(paste("Mean:", result$Mean))
print(paste("Median:", result$Median))
print(paste("Standard Deviation:", result$SD))

# Part C: Analytical Understanding (Short Answers)
# 1. Why is data type identification important in R?
# It ensures correct operations, memory efficiency, and prevents runtime errors during analysis.

# 2. How do control structures help in data analysis?
# They allow conditional execution, repetition, and decision-making over datasets.

# 3. What is the advantage of user-defined functions?
# They improve code reusability, readability, and modularity.

# 4. Why are external packages required in R?
# They provide advanced functionality not available in base R, such as data visualization and Excel handling.