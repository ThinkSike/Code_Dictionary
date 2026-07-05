# Write a program to calculate the roots of a quadratic equation.
x = float(input("Enter coefficient of x: ")) 
y = float(input("Enter coefficient of y: ")) 
z = float(input("Enter coefficient of z: ")) 
formula=(-y+(y**2-4*x*z)**0.5)/(2*x)
print("roots of a given quadratic equation is: ", formula)
