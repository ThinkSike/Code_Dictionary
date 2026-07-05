def calculate_simple_interest(principal, time, age):
    rate = 7 if age < 60 else 9
    interest = (principal * rate * time) / 100
    return interest

# Example
p = float(input("Enter principal amount: "))
t = float(input("Enter time in years: "))
a = int(input("Enter age of customer: "))

si = calculate_simple_interest(p, t, a)
print("Simple Interest:", si)
