/**
There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.
 */

// iteration 1
// function candy (ratings) {
//     let distribution = new Array(ratings.length).fill(1);
//     let sum;
//     let changed = true;
//     while (changed) {
//         changed = false;
//         sum = 0;

//         for (let i = 0; i < ratings.length; i++) {
//             let leftInd = (i - 1 >= 0) ? i - 1 : 0;
//             let rightInd = (i + 1 < ratings.length) ? i + 1 : ratings.length - 1;
//             let originalDist = distribution[i];
//             let dist = 1;
//             let dist2 = 1;

//             if (ratings[i] > ratings[leftInd]) {
//                 dist = distribution[leftInd] + 1;
//             }

//             if (ratings[i] > ratings[rightInd]) {
//                 dist2 = distribution[rightInd] + 1;
//             }

//             distribution[i] = dist > dist2 ? dist : dist2;

//             if (distribution[i] != originalDist) {
//                 changed = true;
//             }
//             sum += distribution[i];
//         }
//     }
//     return sum;
// };

// iteration 2
// the idea of solving this from both sides of the arr is interesting.
function candy(ratings) {
    let n = ratings.length;
    let distribution = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            distribution[i] = distribution[i - 1] + 1;
        }
    }

    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            distribution[i] = Math.max(distribution[i], distribution[i + 1] + 1);
        }
    }

    return distribution.reduce((sum, candies) => sum + candies, 0);
}

console.log(candy([1, 2, 87, 87, 87, 2, 1]));
console.log(candy([1, 0, 2]));