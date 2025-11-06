// Problem Description
// A collection of spelling blocks has two letters per block, as shown in this list:

// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M
// This limits the words you can spell with the blocks to only those words that do not use both letters from any given block. You can also only use each block once.

// Write a function that takes a word string as an argument, and returns true if the word can be spelled using the set of blocks, or false otherwise. You can consider the letters to be case-insensitive when you apply the rules.

// Examples:

/*
---- PROBLEM ----
input: string
output: boolean

rules:
  - input strings are case insensitive
  - block letters can only be used once.
  - (cleaned) strings greater than 13 characters will return false
  - if any single character occurs more than once; return false
  - do not account for non-alphabetic characters
  - the same character can occur multiple times, but not same BLOCK character

---- EXAMPES ----
// B:O   X:K   D:Q   C:P   N:A
// G:T   R:E   F:S   J:W   H:U
// V:I   L:Y   Z:M
[A B C D E F G H I J K L M]
[N O P Q R S T U V W X Y Z]

'love' -> L:Y B:O V:I R:E => true
[l o v e] => indices: [11, 1, 8, 4] => all indices are different => true

'Love Cats' -> L:Y B:O V:I R:E C:P N:A G:T F:S => true
[l o v e c a t s] => [11, 1, 8, 4, 2, 0, 6, 5] => all indices are different => true

'code' -> C:P O:B D:Q R:E => true
[c o d e] => [2, 1, 3, 4] => all indices are different => true

'coder' -> C:P O:B D:Q R:E R:E => false
[c o d e r] => [2, 1, 3, 4, 4] => all indicides are NOT different => false

'alyssa' -> N:A L:Y L:Y F:S F:S N:A => false
[a l y s s a] => [0, 11, 11, 5, 5, 0] = false

'alissa' -> N:A L:Y V:I F:S F:S N:A => false
[a l i s s a] => [0, 11, 8, 5, 5, 0] => true

---- DATA STRUCTURES ----
input: string
  intermediate:
    - 2 arrays to test a character:
      - first half alphabet:  ['a', 'b', ... 'm']
      - second half alphabet: ['n', 'o', ... 'z']
    - split input string into array of downcase alphabetic characters
      - transform into array of indices
output: boolean

---- ALGORITHM ----
High Level:
1. Create two arrays for testing characters - one with first half of alphabet & second wih last half of alphabet
2. Clean string by removing all non-alphabetic characters, removing duplicate chars, and downcasing
4. Transform each character into their respective index from the testing alphabet arrays
6. If any index occurs twice, return false
*/

function isBlockWord(text) {
  const first = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
  const last = ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const uniqueChars = getUnique(text.match(/[a-z]/ig).map(char => char.toLowerCase()));
  const indices = uniqueChars.map(char => {
    return first.includes(char) ? first.indexOf(char) : last.indexOf(char)
  });

  return !hasDuplicates(indices);
}

function hasDuplicates(array) {
  return array.length !== getUnique(array).length;
}

function getUnique(array) {
  return [...new Set(array)];
}

// Happy Path
console.log(isBlockWord('BATCH'));      // true
console.log(isBlockWord('BUTCH'));      // false
console.log(isBlockWord('jest'));       // true
console.log(isBlockWord('Love'));       // true
console.log(isBlockWord('love Cats'));  // true
console.log(isBlockWord('code'));       // true
console.log(isBlockWord('coder'));      // false

// Edge Cases
console.log(isBlockWord('Alyssa'));          // false
console.log(isBlockWord('Alissa'));         // true
console.log(isBlockWord(' BA.T[C]H/'));      // true
console.log(isBlockWord(' BU.T[C]H/'));      // false
console.log(isBlockWord('abcdefghijklmn'));  // false
console.log(isBlockWord('(((((     jest    )))))'));  // true