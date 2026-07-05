#Write a program to sum the series-1+1/2+…..+1/n
range_ = int(input("Specify range:"))
sum = 0
for i in range(1, range_+ 1):
    sum = sum + (1/i)
print(sum)

# #Write a program to sum the series-1+1/2+…..+1/n
# range_ = int(input("Specify range:"))
# sum = 0
# for i in range(1, range_):
#     sum = sum + (i/(i*0.5))
## sum = sum + (i/(i+1))
# print(sum)