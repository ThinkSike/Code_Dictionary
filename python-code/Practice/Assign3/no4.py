# Write a program to find the greatest number from three numbers.
num1=int(input("Enter num 1: "))
num2=int(input("Enter num 2: "))
num3=int(input("Enter num 3: "))
if(num1 > num2 and num1 > num3):
    print(num1, " is greatest.")
elif(num2 > num1 and num2 > num3):
    print(num2, " is greatest.")
else:
    print(num3, " is greatest.")
