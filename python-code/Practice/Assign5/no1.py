print("hELO WORLD")
import re

text = "The quick brown fox jumps over the lazy dog. The fox is clever."

# `sub()` - Replace 'fox' with 'cat'
new_text = re.sub(r'fox', 'cat', text)
print("After sub():", new_text)

# `search()` - Find first occurrence of 'fox'
match = re.search(r'fox', text)
if match:
    print(f"'fox' found at index: {match.start()}")

# `findall()` - Find all occurrences of 'the' (case-insensitive)
all_matches = re.findall(r'the', text, re.IGNORECASE)
print("Occurrences of 'the':", len(all_matches))
