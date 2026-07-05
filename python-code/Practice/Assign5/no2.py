import string

# Generate words with increasing letters
def abecedarian_series():
    for i in range(1, 27):
        print(string.ascii_lowercase[:i])  # Print first `i` letters

abecedarian_series()