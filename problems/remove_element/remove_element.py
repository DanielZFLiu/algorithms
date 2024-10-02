# draw my algo on a piece of paper
# work out a few examples after I finish the algo
# this one had edge cases that I didn't consider
# also i didnt optimize the logic

def removeElement(nums, val):
    """
    :type nums: List[int]
    :type val: int
    :rtype: int
    """
    if nums == []:
        return 0
    
    pointer1 = 0
    pointer2 = len(nums) - 1
    while pointer1 != pointer2:
        if nums[pointer1] == val:
            nums[pointer1], nums[pointer2] = nums[pointer2], nums[pointer1]
            pointer2 -= 1
        else:
            pointer1 += 1

    if nums[pointer1] == val:
        return pointer1
    return pointer1 + 1

def test():
    nums = [3, 2, 2, 3]
    val = 3
    assert removeElement(nums, val) == 2
    assert nums == [2, 2, 3, 3]
    nums = [0,1,2,2,3,0,4,2]
    val = 2
    assert removeElement(nums, val) == 5
    print(nums)

    
    nums = [2,2]
    val = 2
    print(removeElement(nums, val))
    print(nums)
    print('All tests passed')

test()