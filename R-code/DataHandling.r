print(getpwd())
setwd("..")
print(getwd())

# Data Reading
data<-read_.csv("records.csv")
print(data)

# Data Analysis
csv_data<-read.csv("record.csv")
print(is.data.frame(csv_data))
print(ncol(csv_data))
print(nrow(csv_data))

# Getting Maximum salary
csv_data<- read.csv("record.csv")
max_salry <- max(csv_data$Salary)
print(max_salary)

# Details of employee working in IT department
csv_data<- read.csv("record.csv")
details<-subset(csv_data, dept=="IT")
print(details)

# Details of employee having salary > 50000 and working in IT Department
csv_data<- read.csv("record.csv")
details<-subset(csv_data, Salary>50000 & dept=="IT")
print(details)

# Details of employees joined on or after 2014
csv_data<- read.csv("record.csv")
details<-subset(csv_data, as.Date(start_date) > as.Date("2014-01-01"))
print(details)

# Data Writing
csv_data<- read.csv("record.csv")
details<subset(csv_data, as.Date(start_date) > as.Date("2014-01-01"))
write.csv(details, "output.csv")
new_details<-read.csv("output.csv")
print(new_details)

