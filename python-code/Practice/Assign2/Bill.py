'''Write a program to calculate the bill amount for an
item given its quantity sold, value, discount and tax'''
price= int(input("Enter price: "))
quantity=int(input("Enter quantity:"))
discount=int(input("Enter discount(Rupees): "))
tax=int(input("Enter tax(%):"))
# after_quantity=price*quantity
# after_discount=((discount*quantity)/100)*after_quantity
# after_tax=(tax/100)*after_discount
# final_bill=after_tax
print("*************Bill***************")
print("Price:                       ", price)
print("Quantity:                    ", quantity)
total = price*quantity
print("Discount:                    ", discount, "(Rupees)")
total2 = total-discount
print("Tax:                         ", tax, "(%)")
tax_=tax/10
total3 = total2*tax_
print("Amount:                      ", total3, "(%)")

#print(f"Bill:\nPrice= %d\nDiscount= %d\nQuantity= %d\nTax= %d", price, discount, quantity, tax)