# Write a program to classify a triangle as equilateral, isosceles, or scalene based onits sides.
s1=int(input("Enter side 1: "))
s2=int(input("Enter side 2: "))
s3=int(input("Enter side 3: "))
if(s1==s2==s3):
    print("Triangle is equilateral")
elif(s1==s2 or s1==s3 or s2==s3):
    print("Triangle is isosceles")
else:
    print("Triangle is scalene")