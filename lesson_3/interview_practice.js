// ---- Problem 1 ----
// A distinct string is a string that is present only once in an array.
// Given an array of strings, arr, and an integer, k, return the kth distinct string present in arr. If there are fewer than k distinct strings, return an empty string "".
// Note that the result string is the one encountered earliest in the array.
// Example
distinctString(["d","b","c","b","c","a"], 2); // "a"

/*
--- My Questions ---
- Will the given array ever be empty?
  - If so, do we return an empty string?
- Will the given array only ever contain strings?
  - If not, should we ignore any element that isn't a string?
- What is considered a distinct string?
  - Does case matter?
- Will `k` always be a positive integer?
--- LS Questions ---
* Will we always receive precisely two arguments?
  - If not, what should I do if an argument is omitted?
  - What should I do if there are more than two arguments?
- Will the first argument always be an array?
  - If not, what should I do?
- Will the second argument always be an integer?
  - If not, what shhould I do if it isn't?
- Will the second argument ever be 0?
  - If so, what should I do?
- Will the second argument ever be negative?
  - If so, what should I do?
- Can the array be sparse?
  - If so, how should I handle the missing elements?
- Can the array contain any number of elements?
- Can the array be empty? If so, what should I return in that case?
- Will string always be one character long, or can they be any length?
*/

// ---- Problem 2 ----
// Given an array of integers, nums, return the third largest number in the array. If the third largest number does not exist, return the greatest number.
// You are not allowed to sort the array.
// Example
thirdMax([3, 2, 1]); // 1

/*
--- My Questions ---
- Will we always receive precisely one argument?
  - If not, what should I do if the argument is omitted?
  - What should I do if there is more than one argument?
- Will the argument always be an array?
  - If not, what should I do?
- Can the array ever be empty?
  - If so, what should I do?
- If the array only contains two numbers, do I return the largest number?
- If the array only contains one number, do I return that number?
- Will the integers always be positive?
  - If so, how should I handle those?
- Can I manually sort the array?
--- LS Questions --- (that I didn't ask)
- Can the array be sparse?
  - If so, how should I handle the missing elements?
- Will the array ever contain non-integers?
  - If so, how should I handle those?
- Will the array ever contain `NaN`?
  - If so, how should I handle that?
- Will the array ever contain `Infinity`?
  - If so, how should I handle that?
- Will the array ever contain `-Infinity`?
  - If so, how should I handle that?
- Can the numbers in the array appear in any order? For instance, might I receive a `[1, 3, 2]` array?
  - Does this affect the result in any way?
- Can the array have repeated numbers, e.g., [3, 3, 1]`?
  - If so, how should I handle those? Should I handle the two `3`'s as different numbers and return `1`, or should I return the largest number `3`?
*/

// ---- Problem 3 ----
// Write a function, primeNumberPrinter, that prints all prime numbers present as substrings in a given string.
// Example
primeNumberPrinter("a4bc2k13d"); // [2, 13]

/*
--- My Questions ---
- Will we always be given precisely one argument?
  - If not, what should I do if the argument is omitted?
  - What should I do if there is more than one argument?
- Will the argument always be a string?
  - If not, what should I do?
- Will the string ever be empty?
  - If so, should I return an empty array?
- Will the string ever not contain numbers?
  - If so, what should I do?
- Are number substrings always separated by alphabetic characters, e.g., "a4,2/13"
- Should multi-digit number substrings be broken down into further substrings, e.g., if string is "a2k1345m" would it be: [2, 1234] or [2, 1, 12, 123, 1234, 2, 23, 234, 3, 34]?
- Will a number substring ever attempt to be negative, e.g., 'c2v-4m'?
  - If so, what should I do for negative numbers?
- Can there be repeated numbers?
  - If so, do I include those duplicates or keep it to unique numbers only?
---- LS Questions --- (that I didn't ask)
- Should I return an empty array if the string doesn't contain any prime numbers or any digits at all?
- Can the string contain any number of characters?
- In what order should the nubmers be listed in the output array? Is it the order that the numbers apear in the string?
  - If so, should I treat numbers that are part of a larger number like `23` in `123`? Should `23` be printed before `123` or not?
*/

// ---- Problem 4 ----
// ​Write a function that takes a two-dimensional array as the argument and turns it into a flat array with all duplicated elements removed. Treat numbers and number strings (e.g., 1 and '1') as duplicates, and keep the one that comes first in the result.
// Examples
flattenAndUnique([]); // []
flattenAndUnique([[1, 2, 3], ['3', 4, 5, 'a']]); // [1, 2, 3, 4, 5, 'a']

/*
--- My Questions ---
- Will we always be given precisely one argument?
  - If not, what should I do if the argument is omitted?
  - What should I do if more than one argument is provided?
- Will the argument always be an array?
  - If not, what should I do?
- Will the array elements only ever be arrays?
  - If not, what should I do with elements that aren't an array?
- Will the array ever be sparse?
  - If so, how should I handle the missing elements?
- Will a nested array ever contain non-primitives?
  - If so, are duplicate objects objects with the same key-value pairs, or object identity?
  - If so, should the returned array contain the reference to that object?
- Will a nested array ever contain `NaN`, `Infinity`, or `-Infinity`?
  - If so, do Io remove duplicate `NaN`'s?
  - If so, is the string "infinity" considered equal to `Infinity`?
- Does case matter when determining duplicate elements, e.g., would `'a'` and `'A'` be considered duplicate strings?
--- LS Questions ---
- Can the array contain any number of subarrays?
- Can the subarrasy be empty?
  - What should I do in this case?
*/