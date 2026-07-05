file = open("example.txt", "r")
try:
    content = file.read()
    print(content)
except ValueError as e:
    print("Error:", e)
file.close()
