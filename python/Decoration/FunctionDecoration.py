__author__ = 'I312934'

print("-----------Normal function")


def string_len(s):
    return len(s)

print(string_len("some string with some length"))
print(string_len([1, 2, 3, 4]))


def string_required(f):
    def string_check(args):
        if type(args) != str:
            raise TypeError("Passed argument is not a string")
        return f(args)
    return string_check

print("-----------Decoration without annotation")
string_len = string_required(string_len)

print(string_len("some string with some length"))
print(string_len([1, 2, 3, 4]))


''' remove this comment and comment the section above in order to test this example
print("-----------Decoration with annotation")
#This is shorthand for string_len = string_required(string_len)
@string_required
def string_len1(s):
    return len(s)

print(string_len1("some string with some length"))
print(string_len1([1, 2, 3, 4]))
'''
