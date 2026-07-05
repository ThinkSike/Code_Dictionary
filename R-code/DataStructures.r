# Vectors
apple<-c('red','green','yellow')
print(apple)
print(class(apple))

# Lists
list1 <- list(c(2,3,5), 21.3, sin)
print(list1)

# Matrices
M = matrix(c('a','b','c','d','e','f'), nrow=2, ncol=3, byrow=TRUE)
print(M)

# Data Frames
df <- data.frame(
    Training=c("strength", "stamina", "flexibility"),
    Duration=c(60, 45, 30),
    Calories_Burned=c(500, 400, 200)
)
print(df)