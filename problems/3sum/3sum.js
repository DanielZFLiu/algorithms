/**
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.
 */

// naive answer
// O(n^2), but didnt realize using set & stringify + not skipping duplicates impact runtime so much
// function threeSum(nums){
//     let result = [];
//     let seen = new Set();
//     nums.sort((a, b) => a - b);
//     for(let i = 0; i < nums.length - 2; i++){
//         let left = i + 1;
//         let right = nums.length - 1;
//         while(left < right){
//             let sum = nums[i] + nums[left] + nums[right];
//             if(sum === 0){
//                 if(!seen.has(JSON.stringify([nums[i], nums[left], nums[right]]))){
//                     seen.add(JSON.stringify([nums[i], nums[left], nums[right]]));
//                     result.push([nums[i], nums[left], nums[right]]);
//                 }
//                 left++;
//                 right--;
//             }
//             else if(sum < 0){
//                 left++;
//             }
//             else{
//                 right--;
//             }
//         }
//     }
//     return result;
// }

// optimized answer
function threeSum(nums){
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;

    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1; 
        let right = n - 1; 

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++; 
            } else {
                right--; 
            }
        }
    }

    return result;
}

console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]