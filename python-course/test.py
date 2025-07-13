# class Student:
#     name = "suraj mondal"

# s1 = Student()
# print(s1)  

class Student:
    def __init__(self, first_param, second_param):
        # print("this is class")
        # self.fullname = fullname
        # self.gfname = gfname
        # print(self.gfname)
        # print(self.fullname) 
        self.first_param = first_param
        self.second_param = second_param
        print(self.first_param)
        print(self.second_param)
# s1 = Student("Suraj Mondal,", "my girlfriend's name is tiya")
# s2 = Student("this is my second object", None)
s1 = Student("Suraj Mondal", 1)
s2 = Student("My girlfriend's name is Tiya", 2)