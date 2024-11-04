function removeDuplicates(nums) {
    if(nums.length <= 2) return nums.length;

    let count = 0;
    let prevprev = nums[0];
    for(let i = 2; i < nums.length; i++){
        if(nums[i] == nums[i-1] && nums[i] == prevprev && i > 1){
            prevprev = nums[i-1];
            count++;
        }
        else{
            prevprev = nums[i-1];
            nums[i - count] = nums[i];
        }
    }
    return nums.length - count;
};