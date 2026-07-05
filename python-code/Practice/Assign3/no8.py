# Determine if a character is an alphabet, digit, or special character.
input_ = input("Enter: ")
if 'A' <= input_ <= 'Z' or 'a' <= input_ <= 'z':
    print("Alphabet")
elif '0' <= input_ <= '9':
    print("Digit")
else:
    print("Special Character")

# if(input is range(A-Z or a-z)):
#     print("Input is a string..")
# elif(type(input_)=='int'):
#     print("Input is a integer..")
# else:
#     print("invalid input.")