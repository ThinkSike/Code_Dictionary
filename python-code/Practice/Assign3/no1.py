# Write a program that prompts the user to enter a number between 1-7 and then displays the corresponding day of the week. 

num=int(input("Enter no. between 1-7: "))
if(num == 1):
   print("Sunday")
elif(num == 2):
    print("Monday")
elif(num == 3):
   print("Tuesday")
elif(num == 4):
   print("Wednesday")
elif(num == 5):
   print("Thursday")
elif(num == 6):
   print("Friday")
elif(num == 7):
   print("Saturday")
else:
    print("invalid input.")
# switch{
#  1:
#         print("Sunday")
#         break;
#     case 2:
# print("Monday")
# break;
#     case 3:
# print("Tuesday")
# break;
#     case 4:
# print("Wednesday")
# break;
#     case 5:
# print("Thursday")
# break;
#     case 6:
# print("Friday")
# break;
#     case 7:
# print("Saturday")
# break;
#     default:
# print("Invalid input")
# }