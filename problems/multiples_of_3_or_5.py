# Project Euler: Problem 1
# If we list all the natural numbers below 10 that are multiples of 3 or 5, 
# we get 3, 5, 6 and 9. The sum of these multiples is 23.
# Find the sum of all the multiples of 3 or 5 below 1000.

def answer():
    accumulator = 0;
    multiplesOf3 = 3;
    multiplesOf5 = 5;
    while multiplesOf3 < 1000:
        accumulator += multiplesOf3
        lastDigit = (multiplesOf3 + 3) % 10
        if lastDigit != 0 and lastDigit != 5:
            multiplesOf3 += 3
        else:
            multiplesOf3 += 6

    while multiplesOf5 < 1000:
        accumulator += multiplesOf5
        multiplesOf5 += 5
    
    return accumulator

# ./benchmark problems.multiples_of_3_or_5 answer