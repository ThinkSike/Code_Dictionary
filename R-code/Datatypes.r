# Datatypes
print ("HEllo")
v <- 2.3
print(class(v))
v <- TRUE
print(class(v))
v <- 2L
print(class(v))

# vectors
apple <- c('red','yellow', 'green')
print(class(apple))
print(apple)

# list
list1 <- list(c(2,5,3), 21.3, sin)
print(list1)

# matrics
M=matrix(c('a','a','b','b','c','c','b','b','c','c'),nrow=5,ncol=2,byrow=TRUE)
print(M)

# array
a <- array(c('green','yellow', 'blue', 'red','orange'), dim=c(3,3,1))
print(a)

# factors
colors <- c('red','orange','yellow','green','blue','purple')
factor_colors <- factor(colors)
print(factor_colors)
print(nlevels(factor_colors))

# variables
var.1 = c(0,1,2,3,4)
var.2 = c("learn", "R")
var.3 = c(TRUE, 1)
cat(var.1, var.2, var.3)

# Operators(arithmetic)
int1 <- c(1, 2, 3, 4)
int2 <- c(1, 2, 3, 4)
print(int1+int2)
print(int1-int2)
print(int1*int2)
print(int1/int2)
# Operators(relational)
print(3>2)
# Operators(logical)
v <-c(3, 1, TRUE, 2+3i)
t <- c(4, 1, FALSE, 2+3i)
print(v & t)

# Assignment Operators
v1 <- c(3, 1, TRUE, 2+3i)
v2 <<- c(3, 1, TRUE, 2+3i)
v3=c(3, 1, TRUE, 2+3i)
print(v1)
print(v2)
print(v3)