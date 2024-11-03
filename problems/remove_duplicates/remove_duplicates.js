/**
 * example
 * carryon =[3, 4, 4, 5]
 * 
[1, 2, 2, 3, 4, 4, 4, 5, 5, 6]
[1, 2, 3, 3, 4, 4, 4, 5, 5, 6]
[1, 2, 3, 4, 4, 4, 4, 5, 5, 6]
[1, 2, 3, 4, 5, 4, 4, 5, 5, 6]
[1, 2, 3, 4, 5, 6, 4, 5, 5, 6]

should be O(n) time complexity
 */

// first iteration
// theoretically count could be replaced by nums.length - carryon.length
// prev could be replaced by nums[i - 1]
function removeDuplicates(nums){
    // nums in non decreasing order
    let carryon = [];
    let prev = -101;
    let count = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] == prev){
            carryon.push(nums[i]);
            prev = nums[i];
        }
        else{
            prev = nums[i];
            nums[i - carryon.length] = nums[i];
            count++;
        }
    }
}