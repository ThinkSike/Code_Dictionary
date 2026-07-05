# Write a program to take input from the user and then check whether it is a number or a character.
# input_ = input("Enter: ")
# if(str(type(input_))==class<'str'>):
#     print("Input is a string..")
# elif(type(input_)==class<'int'>):
#     print("Input is a integer..")
# else:
#     print("invalid input.")


# input_ = input("Enter: ")
# if 'A' <= input_ <= 'Z' or 'a' <= input_ <= 'z':
#     print("Alphabet")
# elif '0' <= input_ <= '9':
#     print("Digit")
# else:
#     print("Special Character")

input_ = input("Enter: ")
if  '0' <= input_ <= '9':
    print("Number")
else:
    print("Character")