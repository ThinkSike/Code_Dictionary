text = "Hello World, Welcome to Python Programming!"

# `upper()`
print("Uppercase:", text.upper())

# `lower()`
print("Lowercase:", text.lower())

# `split()`
words = text.split()
print("Split words:", words)

# `join()`
joined_text = " ".join(words)
print("Joined Text:", joined_text)

# `count()`
print("Count of 'o':", text.count('o'))

# `replace()`
print("Replacing 'World' with 'Universe':", text.replace('World', 'Universe'))

# `find()`
index = text.find('Python')
if index != -1:
    print("'Python' found at index:", index)
else:
    print("'Python' not found")
