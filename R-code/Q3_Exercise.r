# Q3. Control Structures 
# 1. Write an if–else statement to check: 
#     o Whether average sales / happiness score is high or low. 
# 2. Use a for loop to display first 10 values of a numerical column. 
# 3. Use a while loop to count how many rows satisfy a given condition. 
# 4. Use ifelse() to classify values into categories (High / Medium / Low). 5. Explain the difference between if and ifelse() using dataset values. Q4. Functions in R 1. Write a user-defined function to calculate: o Mean, median, and standard deviation of a numeric column. 2. Call the function for two different columns. 3. Write a function to find maximum and minimum values. 4. Pass dataset column as an argument to the function. 
# 5. Explain the difference between if and ifelse() using dataset values. 

# 1
if(average_sales > 500){
    print("Average sales is high")
} else {
    print("Average sales is low")
}

# 2
for(i in 1:10){
    print(numeric_Column[i])
}

# 3
count <- 0
i <- 1
while(i <= nrow(dataset)){
    if(dataset$conditionColumn[i]==TRUE){
        count <- count + 1
    }
    i <- i + 1
} 

# 4
dataset$category <- ifelse(dataset$numeric_Column > 700, "High",
ifelse(dataset$numeric_Column > 300, "Medium", "Low"))

# 5
# The 'if' statement is used for single condition checks and executes a block of code based on that condition.
# The 'ifelse()' function is vectorized and can evaluate multiple conditions across a vector or column, returning a vector of results.
# Example using dataset values:
if(dataset$numeric_Column[1] > 500){
    print("First value is high")
} else {
    print("First value is low")
}
result <- ifelse(dataset$numeric_Column > 500, "High", "Low")
print(result)
# The 'if' statement checks only the first value, while 'ifelse()' classifies all values in the column.
print(paste("Number of rows satisfying the condition:", count))
print(paste("Total rows satisfying the condition:", count))