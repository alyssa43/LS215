// Problem Description
// The Luhn formula is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers and Canadian Social Insurance Numbers.

// The formula verifies a number against its included check digit, which is usually appended to a partial number to generate the full number. This number must pass the following test:

// Counting from the rightmost digit and moving left, double the value of every second digit
// For any digit that thus become 10 or more, subtract 9 from the result

// Part One:
// 1111 becomes 2121
// 8763 becomes 7733 (from 2 x 6 = 12 -> 12 - 9 = 3 and 2 x 8 = 16 -> 16 - 9 = 7)

// Part Two:
// Add all these digits together
// 1111 becomes 2121 sums as 2 + 1 + 2 + 1 to give a checksum of 6
// 8763 becomes 7733, and 7 + 7 + 3 + 3 is 20

// Part Three:
// If the total (the checksum) ends in 0 (put another way, if the total modulo 10 is congruent to 0), then the number is valid according to the Luhn Formula; else it is not valid. Thus, 1111 is not valid (as shown above, it comes out to 6), while 8763 is valid (as shown above, it comes out to 20).

// Write a program that, given a number in string format, check if it is valid per the Luhn formula. This should treat, for example, "2323 2005 7766 3554" as valid. You can ignore all non-numeric characters in the input string.

/*
"2323 2005 7766 3554"
                  ^ 10
"2323 2005 7766 35104"
---- PROBLEM ----
input: String - contains digits as well as any other non-numeric characters
output: Boolean - true if the input number is valid per the Luhn Formula; false otherwise

Rules:
  - If the input string is missing, or empty; return false
  - If the input string does not contain digits; return false
  - Any digit that becomes greater than 10 when doubling gets 9 subtracted from it
  - If the total sum of all digits at the end doesn't end in 0; return false
  - Ignore all non-numeric characters

---- EXAMPLES ----
1111
   ^ - Remains unchanged -> 1
1111 
  ^ - doubles -> 1 * 2 = 2
1121
 ^ - remains unchanged ->  1
1121
^ - doubles -> 1 * 2 = 2
2121 => 2 + 1 + 2 + 1 => 6 => 6 % 10 === 0 ? false

8763 
   ^ - remains unchanged -> 3
8763
  ^ - doubled -> 6 * 2 = 12 - 9 = 3
8733
 ^ - remains unchanged -> 7
8733
^ - doubled -> 8 * 2 = 16 - 9 = 7
7733 => 7 + 3 + 7 + 3 => 20 => 20 % 10 === 0 ? true

[3 6 8 7] -> transform odd indexes

---- DATA STRUCTURES ----
starting: string
  intermediate: array of digits - transform the string digit into a number
ending: boolen

---- ALGORITHM ----
High Level:
1. Clean the string by removing and character that isn't a digit
2. Working from the most right digit, transform every 2nd digit per the Luhn Formula
3. Add the sum of all transformed digits together
4. Determine if the sum end in 0

Detailed:
-- If input is undefined return false --
1. Clean the string by removing any character that isn't a digit
  - create an array that contains only the digits: `match`
  - transform digits into their numerical value

2. Working from the first digit, transform every 2nd digit per the Luhn Formula
  - reverse the array of digits and iterate through the array passing in each element and it's index (`map`)
    - if the index % 2 === 1, then double the number
    - if the double number < 10; return that value for transformation
    - if the doubled number > 10; subtract 9 and return that value for transformation

3. Add the sum of all transformed digits together
  - reduce the array of transformed digits into the sum of all the digits

4. Determine if the sum end in 0
  - if the sum % 10 === 0 return true; otherwise return false
*/

/*
Write a function that can add a check digit to make the number valid per the Luhn Formula and return the original number plus that digit. This should give "2323 2205 7766 3554" to "2323 2205 7766 355"
- input: string representing a checksum
- output: string that is valid per Luhn Formula
*/

function addCheckDigit(stringNumber) {
  if (isValidLuhnNumber(stringNumber)) return stringNumber;

  for (let checkDig = 0; checkDig < 10; checkDig += 1) {
    let result = stringNumber + String(checkDig);
    if (isValidLuhnNumber(result)) return result;
  }
}

function isValidLuhnNumber(stringNumber) {
  if (!stringNumber || !/\d/.test(stringNumber)) return false;
  const digits = (stringNumber.match(/\d/g).map(Number)).reverse();
  const sum = sumArray(transformLuhnFormula(digits));
  return sum % 10 === 0;
}

function transformLuhnFormula(digits) {
  return digits.map((digit, index) => {
    if (index % 2 === 0) return digit;
    return digit < 5 ? digit * 2 : (digit * 2) - 9;
  });
}

function sumArray(array) {
  return array.reduce((sum, value) => sum + value, 0);
}

// addCheckDigit Test cases
console.log(addCheckDigit("2323 2005 7766 355") === "2323 2005 7766 3554");
console.log(addCheckDigit('876') === '8763');
console.log(addCheckDigit('1111')  === '11114');
console.log(addCheckDigit("2323 2005 7766 3554") === "2323 2005 7766 3554");
console.log(addCheckDigit('79927398713') === '799273987130');

// Happy Path
console.log(isValidLuhnNumber('1111') === false);
console.log(isValidLuhnNumber('8763') === true);
console.log(isValidLuhnNumber("2323 2005 7766 3554") === true);
console.log(isValidLuhnNumber('0') === true);

// Edge Cases
console.log(isValidLuhnNumber('') === false);
console.log(isValidLuhnNumber() === false);
console.log(isValidLuhnNumber('abcdef') === false);
console.log(isValidLuhnNumber('al[8fna7..6"3[') === true);
console.log(isValidLuhnNumber('asdf1.?1. 1 >*1(') === false);
