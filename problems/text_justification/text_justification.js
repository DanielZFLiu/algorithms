/**
Given an array of strings words and a width maxWidth, 
format the text such that each line has exactly maxWidth 
characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, 
pack as many words as you can in each line. 
Pad extra spaces ' ' when necessary so that each line 
has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. 
If the number of spaces on a line does not divide evenly between words, 
the empty slots on the left will be assigned more spaces than the slots 
on the right.

For the last line of text, it should be left-justified, 
and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space 
characters only. Each word's length is guaranteed to be greater than 0 
and not exceed maxWidth. The input array words contains at least one word.
 */

// first iteration
// seems to be 2N, so about O(N)
// space is O(N) due to group array
// to save space, save index to words instead of group array
function fullJustify(words, maxWidth){
    let counter = 0;
    let group = [];
    let result = [];

    for(let i = 0; i < words.length; i++){
        // if line max length not reached
        if(counter + words[i].length <= maxWidth){
            group.push(words[i]);
            counter += words[i].length + 1;
        }
        // if line max length reached
        else{
            result.push(justifyLine(group, counter - 1, maxWidth));
            group = [words[i]];
            counter = words[i].length + 1;
        }
    }
    let lastLine = group.join(' ');
    lastLine += ' '.repeat(maxWidth - lastLine.length);
    result.push(lastLine);

    return result;
}

function justifyLine(words, wordsLength, maxLength){
    let space = Math.floor((maxLength - wordsLength) / (words.length - 1 || 1));
    let extraSpace = maxLength - wordsLength - space * (words.length - 1 || 1);
    let result = '';
    for(let i = 0; i < words.length - 1; i++){
        result += words[i] + ' ' + ' '.repeat(space);
        if(extraSpace > 0){
            result += ' ';
            extraSpace--;
        }
    }
    result += words[words.length - 1];
    result += ' '.repeat(maxLength - result.length);
    return result;
}

console.log(fullJustify(["This", "is", "an", "example", "of", "text", "justification."], 16));
console.log(fullJustify(["What","must","be","acknowledgment","shall","be"], 16));