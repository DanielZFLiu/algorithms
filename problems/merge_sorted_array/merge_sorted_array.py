def merge(nums1, m, nums2, n):
    pointer1 = 0
    pointer2 = 0
    newArr = []
    while pointer1 < m and pointer2 < n:
        if nums1[pointer1] < nums2[pointer2]:
            newArr.append(nums1[pointer1])
            pointer1 += 1
        else:
            newArr.append(nums2[pointer2])
            pointer2 += 1
    
    if pointer1 < m:
        newArr.extend(nums1[pointer1:m])
    elif pointer2 < n:
        newArr.extend(nums2[pointer2:])
    
    nums1[:m+n] = newArr

def test_merge_case1():
    nums1 = [1, 2, 3, 0, 0, 0]
    m = 3
    nums2 = [2, 5, 6]
    n = 3
    merge(nums1, m, nums2, n)
    assert nums1 == [1, 2, 2, 3, 5, 6]

def test_merge_case2():
    nums1 = [4, 5, 6, 0, 0, 0]
    m = 3
    nums2 = [1, 2, 3]
    n = 3
    merge(nums1, m, nums2, n)
    assert nums1 == [1, 2, 3, 4, 5, 6]

def test_merge_case3():
    nums1 = [1, 3, 5, 0, 0, 0]
    m = 3
    nums2 = [2, 4, 6]
    n = 3
    merge(nums1, m, nums2, n)
    assert nums1 == [1, 2, 3, 4, 5, 6]

def test_merge_case4():
    nums1 = [0]
    m = 0
    nums2 = [1]
    n = 1
    merge(nums1, m, nums2, n)
    assert nums1 == [1]

def test_merge_case5():
    nums1 = [1]
    m = 1
    nums2 = []
    n = 0
    merge(nums1, m, nums2, n)
    assert nums1 == [1]

test_merge_case1()
test_merge_case2()
test_merge_case3()
test_merge_case4()
test_merge_case5()