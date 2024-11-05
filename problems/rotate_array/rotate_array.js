//Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
function rotate(nums, k) {
    let copy = [...nums];
    for(let i = 0; i < nums.length; i++){
        nums[(i+k)%nums.length] = copy[i];
    }

    return nums;
}

// alternatively, can reduce space from O(n) -> o(1) by increasing runtime from O(n) -> O(nk), using the naive method.