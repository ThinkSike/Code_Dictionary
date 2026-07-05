# Pie chart
geeks<-c(23, 56, 20, 63)
labels<-c("Mumbai","Delhi","Bangalore","Hyderabad")
pie(geeks, labels)

# Bar chart
heights<-c(2,4,6,8, 17, 32, 8, 53, 1)
barplot(heights, xlab="X-axis", ylab="Y-axis", main="Bar-charts")

# create a dataset and do statistical analysis on the data
?plot
?chickwts
data(chickwts) # loading data into workspace
plot(chickwts$feed)

barplot(feeds[order(feeds, decreasing=TRUE)])

# Finding Correlation and Covariance
# correlation
x=c(1, 2, 3, 4, 5, 6, 7)
y=c(1, 3, 5, 6, 2, 3, 4)

result=cor(x, y, method="pearson")
cat("Pearson correlation coefficient is: ", result)
# covariance
print(cov(x, y))
print(cov(x, y, method="pearson"))
print(cov(x, y, method="kendall"))
print(cov(x, y, method="spearman"))
