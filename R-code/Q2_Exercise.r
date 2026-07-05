# Q2. Operators in R 
# Part A: Arithmetic Operators 
# 1. Using the Sales dataset, calculate the total sales value using arithmetic operators. 
# 2. Using the COVID-19 dataset, calculate the total confirmed cases across all countries. 
# 3. Using the Monthly Airline Passengers dataset, calculate the total number of passengers. 
# 4. Compute the average sales from the Sales dataset. 
# 5. Calculate the average happiness score from the World Happiness dataset.

# Part B: Relational Operators 
# 1. Using relational operators, find all records in the Sales dataset where sales are greater than the average sales. 
# 2. Identify countries from the World Happiness dataset where the happiness score is greater than the global average score. 
# 3. From the COVID-19 dataset, find dates where confirmed cases are greater than the mean confirmed cases. 
# 4. Identify products from the Superstore dataset where profit is greater than zero. 
# 5. Find months from the Airline Passengers dataset where passenger count is greater than the average passengers.

# Part C: Logical Operators
# 1. Using logical operators, identify rows in the Sales dataset where
# sales &gt; 500 AND profit &gt; 0.
# 2. From the Superstore dataset, find records where
# sales &gt; 1000 OR profit &gt; 500.
# 3. Identify countries from the COVID-19 dataset where
# confirmed cases &gt; 1,00,000 AND deaths &gt; 1,000.
# 4. From the Student Performance dataset, find students where
# final grade (G3) ≥ 15 AND study time &gt; 2.
# 5. Identify airlines months where
# passengers &gt; 300 AND passengers &lt; 500.

# Part D: Assignment Operators
# 1. Store the total sales, average sales, and maximum sales in separate variables.
# 2. Assign the filtered dataset (sales &gt; average sales) to a new variable.
# 3. Store the count of records where sales &gt; 500 AND profit &gt; 0 in a variable.
# 4. Assign the total confirmed COVID-19 cases to a variable.
# 5. Store the total airline passengers in a variable and display it.

setwd("D:/ClgAssignments/Datasets/DSBDA_Datasets")

sales <- read.csv("sales.csv")
covid <- read.csv(("covid.csv"))
airline<-read.csv("airline.csv")
superstore <read.csv("Superstore.csv")

library(readxl)
happiness <- read_excel("happiness.xlsx")

sales <- read.csv("sales.csv")
superstore <- read.csv("Superstore.csv", encoding = "latin1")
covid <- read.csv("covid.csv")
student <- read.csv("student-mat.csv")
airline <- read.csv("airline.csv")

# A1
total_sales <- sum(sales$Sales)
total_sales

# A2
total_confirmed_cases <- sum(covid$Confirmed)
total_confirmed_cases

# A3
total_passengers <- sum(airline$Passengers)
total_passengers

# A4
average_sales <- mean(sales$Sales)
average_sales

# A5
average_happiness <- mean(happiness$Happiness_Score)
average_happiness

# B1
above_Average_sales <- sales[sales$Sales > average_sales,]
above_Average_sales

# B2
happier_countries <- happiness[happiness$Happiness_Score > average_happiness,]
happier_countries

# B3
mean_confirmed_cases <- mean(covid$Confirmed)
high_covid_dates <- covid[covid$Confirmed > mean_confirmed_cases,]
high_covid_dates

# B4
profit_products <- superstore[superstore$Profit > 0,]
profit_products$Product.Name
profit_products

# B5
mean_passengers <- mean(airline$Passengers)
high_passenger_months <- airline[airline$Passengers > mean_passengers,]
high_passenger_months$Month
high_passenger_months

# C1
sales_and_profit <- sales[sales$Sales > 500 & sales$Profit > 0,]
sales_and_profit

# C2
superstore_filter <- superstore[superstore$Sales >1000 | superstore$Profit > 500,]
superstore_filter

# C3
covid_high <- covid[covid$Confirmed > 100000 & covid$Deaths > 1000,]
covid_high

# C4
good_students <- student[student$G3 >= 15 & student$studytime > 2,]
good_students

# C5
mid_passengers <- airline[airline$Passengers > 300 & airline$Passengers < 500,]
mid_passengers

# D1
total_sales <- sum(sales$Sales)
average_sales <- mean(sales$Sales)
max_sales <- max(sales$Sales)

# D2
above_avg_sales <- sales[sales$Sales > average_sales,]
above_avg_sales

# D3
count_high_sales <- nrow(sales_and_profit)
count_high_sales

# D4
total_confirmed_cases <- sum(covid$Confirmed)
total_confirmed_cases

# D5
total_passengers <- sum(airline$Passengers)
total_passengers

