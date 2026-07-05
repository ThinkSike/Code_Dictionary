# Check if a character entered by the user is a vowel or a consonant.
letter =input("Enter letter: ")
if((letter=="a") or (letter=="A") or (letter=="e") or (letter=="E") or (letter=="i") or (letter=="I") or (letter=="o") or (letter=="O") or (letter=="u") or (letter=="U")):
    print(letter, " is vowel.")
else:
    print(letter, " is consonant.")