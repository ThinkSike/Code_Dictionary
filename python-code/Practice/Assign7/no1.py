# with open("example.txt", "w") as file:
#     file.write("Your text goes here")
file = open("example.txt", "r")
print("File Name:", file.name)
print("File Mode:", file.mode)
print("Is File Closed:", file.closed)

file.close()
print("Is File Closed After Closing:", file.closed)
