// You are given a list of numbers in a "short-hand" range where only the significant part of the next number is written because we know the numbers are always increasing (ex. "1, 3, 7, 2, 4, 1" represents [1, 3, 7, 12, 14, 21]). Some people use different separators for their ranges (ex. "1-3, 1-2", "1:3, 1:2", "1..3, 1..2" represent the same numbers [1, 2, 3, 11, 12]). Range limits are always inclusive.

// Your job is to return a list of complete numbers.

// The possible separators are: ["-", ":", ".."]

// "1, 3, 7, 2, 4, 1" --> 1, 3, 7, 12, 14, 21
// "1-3, 1-2" --> 1, 2, 3, 11, 12
// "1:5:2" --> 1, 2, 3, 4, 5, 6, ... 12
// "104-2" --> 104, 105, ... 112
// "104-02" --> 104, 105, ... 202
// "545, 64:11" --> 545, 564, 565, .. 611

/* 
---- PROBLEM ----
input: string
output: array of numbers
Given a string representing comma separated ranges of numbers, return an array containing all the numbers in the ranges
Rules:
  - Ranges can include only 1 number; in that case the range is just that digits numeric value ex: '1' -> 1
  - Ranges are separated with either: '-', ':', '..'
  - Ranges can use different types of separators EX: '1:5-2'
  - Ranges are always inclusive EX: 1-5 -> [1, 2, 3, 4, 5]
  - Numbers will always increment, if numbers do not increment they are written shorthand
    EX: '1, 3, 7, 2, 4, 1' -> [1, 3, 7, 12, 14, 21]
  - If input is an empty string - assume we return an empty array
  
---- EXAMPLES ----
"1, 3, 7, 2, 4, 1" --> [['1'], ['3'], ['7'], ['2'], ['4'],['1']]  --> "1, 3, 7, 12, 14, 21" --> [1, 3, 7, 12, 14, 21]
"1-3, 1-2"         --> [['1', '3'], ['1','2']]                    --> '1-3, 11-12'          --> [1, 2, 3, 11, 12]
"1:5:2"            --> [['1', '5', '2']]                          --> '1:5:12'              --> [1, 2, 3, 4, 5, 6... 12]
"104-2"            --> [['104', '2']]                             --> '104-112'             --> [104, 105, 106... 112]
"104-02"           --> [['104', '02']]                            --> '104-202              --> [104, 105, 106... 202]
"545, 64:11"       --> [['545'], ['64', '11']]                    --> '545, 564:611'        --> [545, 564, 565, 566... 611]
"5-01"             --> [['5', '01']]                              --> '5-101'               --> [5, 6, 7, 8, 9... 101]

---- DATA STRUCTURES ----
input: string
  - split up input string into an array of ranges: "1-3, 1-2" --> [ '1-3', '1-2' ]
output: array of numbers

---- ALGORITHM ----
High Level:
1. Parse the input string to retrieve all the ranges
2. Expand all shorthand numbers into their respective value
3. Get numbers of each range

HELPER: createRange(start, end)
=> (1, 3,) --> [1, 2, 3]
=> (11, 12) --> [11, 12]
=> (1, 12) -->  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  - create an empty array called `range`
  - using a `for` loop create an iterator that starts at `start` and completes when greater than `end`
    - push the value of the iterator into the `range` array
  - return `range`
  
HELPER: incrementNumbersInArray(array, minimum = 0)
=> (['1'], undefined)      => [1]
=> (['3'], 1)              => [3]
=> (['1', '3'], undefined) => [1, 3]
=> (['1', '2'], 3)         => [11, 12]
  - iterate through the input array using `map`, passing in each `stringNum`
    - find the `stringNum`s numeric value, save into variable called `currentNum`
    - if `currentNum` < `minimum`
      - reassign `currentNum` to return value of `nextNum` passing in `minimum` and `stringNum`
    - reassign `minimum` to the same value as `currentNum`
    - return `currentNum`

HELPER: nextNum(currentNum, ending)
=> (3, '1')  => 11
=> (11, '2') => 12
  - increment `currentNum` by 1
  - transform `currentNum` into a string
  - if the string ends in the `ending`
    - return `currentNum`
  - else repeat process

Detailed:
1. Parse the input string to retrieve all the ranges: 
  - split the input string into an array where each element represents a range (split by the ',')
    EX: "1, 3, 7, 2, 4, 1" --> ['1', '3', '7', '2', '4', '1']
    EX: "1-3, 1-2"         --> ['1-3', '1-2']
  - split each range element by their separator ('..', ':', or '-')
    EX: ['1', '3', '7', '2', '4', '1'] --> [['1'], ['3'], ['7'], ['2'], ['4'], ['1']]
    EX: ['1-3', '1-2']                 --> [['1', '3'], ['1', '2']]
  - assign to variable called `ranges`

2. Expand all numbers into their respective expanded values
HELPER: expandValues(arrayOfValues)
  EX: [['1'], ['3'], ['7'], ['2'], ['4'],['1']]  --> [ '1', '3', '7', '12', '14', '21' ]
  EX: [['1', '3'], ['1','2']]                    --> [ '1-3', '11-12' ]
  EX: [['1', '5', '2']]                          --> [ '1-5-12' ]
  - create an empty array called `usedNums`
  - iterate through the array of `ranges` using `map` passing in each `rangeArray`
    - find the `lastNum` by retrieving the last element of `usedNums` (will be undefined if empty)
    - invoke `incrementNumbersInArray` passing in `rangeArray` and `lastNum` as the arguments
    - push the returned values into the `usedNums` array
    - join together return value of previous invocation using `'-'` to join
    - return joined string for transformed value

3. Get all the numbers of each range
  EX: ['1', '3', '7', '12', '14', '21'] --> [1, 3, 7, 12, 14, 21]
  EX: ['1-3', '11-12']                  --> [1, 2, 3, 11, 12]
  EX: ['1-5-12']                        --> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  - iterate through the `ranges` using `flatMap`, passing in each `range`
  - split the `range` into it's `values` by using it's separator `'-'`
    EX: ['1', '3', '7', '12', '14', '21'] --> [['1'], ['3'], ['7'], ['12'], ['14'], ['21']]
    EX: ['1-3', '11-12']                  --> [['1', '3'], ['11', '12']]
    EX: ['1-5-12']                        --> [['1', '5', '12']]
  - retrieve the `start` number by retrieving the value at the 0 index and coerce into a Number
  - retrieve the `end` number by retrieving the value at the last index and coerve into a Number
  - if there is not a valid `end`, return `start`
  - find the `expandedRange` by invoking `createRange` and passing in `start` and `end`
  - return the `expandedRange` (flatMap will remove allow the returned array to flatten)
*/

function expandRange(rangeString) {
  const ranges = (rangeString.match(/\d+((\.\.|\:|\-)\d+)*/g) || []).map(range => range.match(/\d+/g));
  const expandedRanges = expandValues(ranges);

  return expandedRanges.flatMap(range => {
    const values = range.split('-');
    const start = parseInt(values[0], 10);
    const end = parseInt(values[values.length - 1], 10);
    return end ? createRange(start, end) : start;
  });
}

function expandValues(ranges) {
  const usedNums = [];

  return ranges.map(rangeArray => {
    const lastNum = usedNums[usedNums.length - 1];
    const resultNums = incrementNumbersInArray(rangeArray, lastNum);
    usedNums.push(...resultNums);
    return resultNums.join('-');
  });
}

function createRange(start, end) {
  const range = [];
  for (let i = start; i <= end; i += 1) {
    range.push(i);
  }
  return range;
}

function incrementNumbersInArray(array, minimum = 0) {
  return array.map(stringNum => {
    let currentNum = parseInt(stringNum, 10);
    if (currentNum < minimum) {
      currentNum = nextNum(minimum, stringNum);
    }
    minimum = currentNum;
    return currentNum;
  });
}

function nextNum(currentNum, ending) {
  currentNum += 1;
  return String(currentNum).endsWith(ending) ? currentNum : nextNum(currentNum, ending);
}

console.log(expandRange('')); // []
console.log(expandRange("1, 3, 7, 2, 4, 1")); // [1, 3, 7, 12, 14, 21]
console.log(expandRange("1-3, 1-2")); // [1, 2, 3, 11, 12]
console.log(expandRange("1:5:2")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
console.log(expandRange("1-5:2")); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
console.log(expandRange("104-2")); // [104, 105, 106, 107, 108, 109, 110, 111, 112]
console.log(expandRange("104-02")); // [104, 105, 106, 107, 108, 109, 110, 111, 112 ... 202]
console.log(expandRange("545, 64:11")); // [545, 564, 565, ... 611]
console.log(expandRange('5-01')); // [5, 6, 7, 8 ... 101]
