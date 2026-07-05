# Q1. Data Types and Variables
# 1. Import the selected dataset into R.
# 2. Identify the data type of each column.
# 3. Create variables to store:
#     o Total number of rows
#     o Total number of columns
# 4. Convert one numeric column into integer type.
# 5. Convert one character column into factor type.

# 1
setwd("D:/ClgAssignments/Datasets/DSBDA_Datasets")
sales <- read.csv("sales.csv")

library(readxl)
happiness <- read_excel("happiness.xlsx")

# 2
str(sales)
str(happiness)

# 3
# For sales dataset
sales_rows <- nrow(sales)
sales_cols <- ncol(sales)

sales_rows
sales_cols

# 4
num_col_sales <- as.integer(sales$Quantity)
class(num_col_sales)

numeric_col_sales <-sapply(sales, is.numeric)
sales[, num_col_sales][,1] < as.integer(sales[, numeric_col_sales][,1])

str(num_col_sales)
str(numeric_col_sales)

# 5
char_col_sales <- as.factor(sales$Product)

character_col_sales <- sapply(sales, is.character)
sales[, character_col_sales][,1] <-as.factor(sales[, character_col_sales][,1])

str(char_col_sales)
str(character_col_sales)