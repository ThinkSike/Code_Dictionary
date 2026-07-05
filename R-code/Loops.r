# for loops
# vector
fruit<-c('Apple','Orange', 'Guava')
for (i in fruit){
  print(i)
}

# matrix
mat <- matrix(data=seq(10, 21, by=1), nrow=6, ncol=2)
for (r in 1:row(mat))
  for (c in 1:ncol(mat))
    print(paste("mat[",r,",",c,"]=", mat[r,c]))
print(mat)

# While loop
v <- c("Hello", "while loop")
cnt <- 2
while(cnt<7){
  print(V)
  cnt = cnt + 1
}
