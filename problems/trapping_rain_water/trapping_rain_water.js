/**
Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.
 */

// first iteration
// correct ans, but too slow
// function trap(height){
//     if(height.length < 3){
//         return 0;
//     }

//     let totalWater = 0;
//     let leftBrackets = {};
//     for(let i = 1; i < height.length - 1; i++){
//         if(height[i-1] > height[i] && height[i+1] > height[i]){
//             totalWater += Math.min(height[i-1], height[i+1]) - height[i];
//             console.log("case 1: totalWater: ", totalWater, "index", i);
//         }

//         if(height[i-1] > height[i] && height[i-1] > height[i+1]){
//             for(let j = Math.max(height[i], height[i+1]); j < height[i-1]; j++){
//                 leftBrackets[j] = i;
//             }
//             console.log("case 2: totalWater: ", totalWater, "index", i);
//             console.log(leftBrackets);
//         }
//         else if(height[i-1] < height[i+1] && height[i] < height[i+1]){
//             for(let j = Math.max(height[i], height[i-1]); j < height[i+1]; j++){
//                 if(leftBrackets[j] !== undefined){
//                     totalWater += i - leftBrackets[j] + 1;
//                     leftBrackets[j] = undefined;
//                 }
//             }
//             console.log("case 3: totalWater: ", totalWater, "index", i);
//         }
//     }

//     console.log(totalWater);
//     return totalWater;
// }

/**
notice that the runtime above might be O(nH)
the better solutions employ a 2 sided approach; 
one is dynamic programming, which trades space for time
one is a 2 pointer approach from both sides of the array

this is very similar to the candy problem, where we can solve it from both sides of the array
 */
// better solution 1
var trap = function(height) {
    const n = height.length;
    if (n < 3) return 0;

    const leftMax = new Array(n);
    const rightMax = new Array(n);

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(height[i], leftMax[i - 1]);
    }

    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(height[i], rightMax[i + 1]);
    }

    let totalWater = 0;
    for (let i = 1; i < n - 1; i++) {
        const waterLevel = Math.min(leftMax[i], rightMax[i]);
        if (waterLevel > height[i]) {
            totalWater += waterLevel - height[i];
        }
    }

    console.log(totalWater);
    return totalWater;
};

// better solution 2
var trap2 = function(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }

    console.log(totalWater);
    return totalWater;
};

trap2([0,1,0,2,1,0,1,3,2,1,2,1]);
trap2([4,2,0,3,2,5]);