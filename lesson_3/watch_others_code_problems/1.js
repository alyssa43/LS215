// Problem Description
// Write a program that cleans up user-entered phone numbers so that they can be sent as SMS messages. Other than digits, the number may also contain special character such as spaces, dash, dot, and parentheses that should be ignored.

// The rules are as follows:

// If the phone number is less than 10 digits, assume that it is a bad number.
// If the phone number is 10 digits, assume that it is good.
// If the phone number is 11 digits and the first number is 1, trim the 1 and use the last 10 digits.
// If the phone number is 11 digits and the first number is not 1, then it is a bad number.
// If the phone number is more than 11 digits, assume that it is a bad number.
// For bad numbers, just a return a string of 10 0s.

/*
---- PROBLEM ----
Questions:
  - Is the input always going to be a string? 
    -> Assume yes, other inputs will be considered 'bad' number and return 10 0s
  - Will there always be precisely one argument? 
    -> Assume, if no argument is given consider 'bad' number and return 10 0s

input: string -> may contain any kind of character
output: string -> representing a phone number; or '0000000000' for invalid phone numbers

Rules:
  - If an input string has less than 10 digits; it is 'bad'
  - If an input has 11 digits and the first digit is NOT a 1; it is 'bad'
  - 'Good' numbers must have either:
    - Exactly 10 digits
    - OR 11 digits where the first digit is a 1
  - If a 'Good' number has 11 digits and starts with a 1; do not include the 1 in the return result

---- EXAMPLES ----
'123456789' -> less than 10 digits -> '0000000000'
'01234567891' -> 11 digits that DOESNT start with 1 -> '0000000000'
"a12l3.4sjka5a6/7,8as9';[0]" -> 10 digits -> 1234567890

---- DATA STRUCTURES ----
Starting: String
Intermediate: Split the given string into an array of all digits found in given string
  - "a12l3.4sjka5a6/7,8a0s9';[0]" => ['1','2', '3', '4', '5', '6', '7', '8', '9', '0']
  - Join back together as result string -> "1234567890"
Ending: String

---- ALGORITHM ----
High Level:
1. If string is empty, missing, or less than 10 characters long; return '0000000000'
2. Find all the digits within the string
3. Determine if the digits can form a valid phone number

Detailed:
1. If string is empty, missing, or less than 10 characters long; return '0000000000'

2. Find all the digits within the string
  - Using a global regex, find all the digits in the string

3. Determine if the digits can form a valid phone number
  - If there are 10 digits; join the digits together into a string and return
  - If there are 11 digits and the first digit is a 1; join the digits together into a string and return
  - Otherwise, return '0000000000'
*/

function parsePhoneNum(string) {
  const badNumber = '0000000000'
  if (!string || string.length < 10) return badNumber;
  const digits = string.match(/\d/g) || [];

  if (isValidPhoneNum(digits)) {
    return digits.length === 10 ? digits.join('') : digits.slice(1).join('');
  } else {
    return badNumber;
  }
}

function isValidPhoneNum(digits) {
  return digits.length === 10 || (digits.length === 11 && digits[0] === '1');
}

// ----- TEST CASES -----

// "Bad Numbers"
console.log(parsePhoneNum('123456789') === '0000000000');
console.log(parsePhoneNum('01234567891') === '0000000000');
console.log(parsePhoneNum('ldsfdh2adsh1')  === '0000000000');
console.log(parsePhoneNum('!lsdflOneTwoThree.23')  === '0000000000');
console.log(parsePhoneNum('')  === '0000000000');
console.log(parsePhoneNum('abcdefghijklmnop') === '0000000000');
console.log(parsePhoneNum()  === '0000000000');


// "Good Numbers" with 10 Digits
console.log(parsePhoneNum("a12l3.4sjka5a6/7,8as9';[0]") === '1234567890');
console.log(parsePhoneNum("5.4.1.8.9,2,3,1.3.9") === '5418923139');

// "Good Numbers" with 11 Digits
console.log(parsePhoneNum("a12l3.4sjka5a6/7,8a0s9';[0]") === '2345678090');
console.log(parsePhoneNum("fm./1.'/24.,2,.6.9.h00k8ajh2jkhd4jh") === '2426900824');
