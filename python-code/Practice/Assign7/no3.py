filename = input("Enter the filename: ")
char = input("Enter the character to count: ")

try:
    with open(filename, "r") as file:
        content = file.read()
        count = content.count(char)
        print(f"The character '{char}' appears {count} times.")
except FileNotFoundError:
    print("File not found.")
