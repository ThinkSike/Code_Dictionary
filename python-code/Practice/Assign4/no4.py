# Write a program to calculate the value of an investment.
# Consider an initial value and annual interest as an input and 
# calculate the value of investment over time.
principal_amount = int(input("Enter principle: "))
rate_of_interest = float(input("Rate of interest: "))
time = int(input("Time(yrs): "))

rate = rate_of_interest/100
total = (principal_amount * rate * time)/100
print("Total Interest: ", total)
# # difference = total - principle_amount
# # value_of_investment = (difference * total)/100
# # print("Value of investment: ", value_of_investment)
# value_of_investment = principle_amount*(1 + rate_of_interest)**time
# print("Value of investment: ", round(value_of_investment, 4))
# #final amount > principle amount

# growth_percentage = ((total - principle_amount) / principle_amount) * 100

# print(f"{time:<5} {total:<15.2f} {growth_percentage:<10.2f}")
final_amount = principal_amount * (1 + rate) ** time

growth_percentage = ((final_amount - principal_amount) / principal_amount) * 100

print("\nYear-wise Investment Growth:")
print("-" * 40)

for year in range(1, time + 1):
    value = principal_amount * (1 + rate) ** year
    print(f"Year {year}: ₹{value:.2f}")

print("-" * 40)
print(f"Initial Investment: ₹{principal_amount:.2f}")
print(f"Final Amount after {time} years: ₹{final_amount:.2f}")
print(f"Growth Percentage: {growth_percentage:.2f}%")