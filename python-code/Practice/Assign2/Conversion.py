
'''Write a program to enter a number and display its hex and octal equivalent and its square root'''

value = int(input("Enter a value: "))
print("Hex Equivalent: ", hex(int(value))[2:])
print("Oct Equivalent: ", oct(int(value))[2:])
print("Square root:    ", value**0.5)