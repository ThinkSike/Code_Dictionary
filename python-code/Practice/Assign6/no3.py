import sys
# Command line: python script.py 5 7
if len(sys.argv) != 3:
    print("Usage: python script.py num1 num2")
else:
    num1 = int(sys.argv[1])
    num2 = int(sys.argv[2])
    print("Sum:", num1 + num2)
