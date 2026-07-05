filename = input("Enter the filename: ")
vowels = "aeiouAEIOU"
vowel_count = 0
consonant_count = 0
try:
    with open(filename, "r") as file:
        content = file.read()
        for ch in content:
            if ch.isalpha():
                if ch in vowels:
                    vowel_count += 1
                else:
                    consonant_count += 1
        total_letters = vowel_count + consonant_count
        if total_letters == 0:
            print("No alphabetic characters in file.")
        else:
            vowel_percent = (vowel_count / total_letters) * 100
            consonant_percent = (consonant_count / total_letters) * 100
            print(f"Vowels: {vowel_percent:.2f}%")
            print(f"Consonants: {consonant_percent:.2f}%")
except FileNotFoundError:
    print("File not found.")
