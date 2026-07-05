# Write a program to check if a given number is divisible by both 5 and 11.
num=int(input("Enter a no.: "))
if(num % 5 == 0 and num % 11 == 0):
    print(num, " is divisible by 11 and 5.")
else:
    print(num, " is not divisible by 11 and 5.")