text = input("Enter a string: ")
char = input("Enter a character to search: ")

if char in text:
    index = text.index(char)
    print(f"'{char}' found at index {index}")
else:
    print(f"'{char}' not found in the string")
