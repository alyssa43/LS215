// Implement encoding and decoding for the rail fence cipher.

// The Rail Fence cipher is a form of transposition cipher that gets its name from the way in which it's encoded. It was already used by the ancient Greeks.

// In the Rail Fence cipher, the message is written downwards on successive "rails" of an imaginary fence, then moving up when we get to the bottom (like a zig-zag). Finally the message is then read off in rows.

// For example, using three "rails" and the message "WE ARE DISCOVERED FLEE AT ONCE", the cipherer writes out:

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .
// Then reads off:

// WECRLTEERDSOEEFEAOCAIVDEN
// To decrypt a message you take the zig-zag shape and fill the ciphertext along the rows.

// ? . . . ? . . . ? . . . ? . . . ? . . . ? . . . ?
// . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
// The first row has seven spots that can be filled with "WECRLTE".

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? . ? .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
// Now the 2nd row takes "ERDSOEEFEAOC".

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . ? . . . ? . . . ? . . . ? . . . ? . . . ? . .
// Leaving "AIVDEN" for the last row.

// W . . . E . . . C . . . R . . . L . . . T . . . E
// . E . R . D . S . O . E . E . F . E . A . O . C .
// . . A . . . I . . . V . . . D . . . E . . . N . .
// If you now read along the zig-zag shape you can read the original message.

/*
---- PROBLEM ----
- Write a `encode` function that takes two arguments: 
  - A string called `text` to be encoded 
  - A number called `rails` that represents the number of rails.

- Write a `decode` function that takes two arguments:
  - A string called `encodedText` to be decoded
  - A number called `rails` that represents the number of rails.

Rules:
  - We must perform both encoding AND decoding
  - The number of "rails" will be passed in as an argument
  - Text on the "fence" is always read from left to right (will move right one position each character)
  - Text on the "fence" always starts at the most top left corner
  - Text starts in the down position (meaning we start by going "down" the fence)
    - When text is "down" the position moves down one rail each character (as well as right)
  - Text switches from "down" to "up" when we reach the bottom "rail"
    - When text is "up" the position moves up one rail each character (as well as right)
  - After text has been "placed" on fence we concat rails as such: starting at top moving down to bottom
    - EX: if there are 5 rails top rail being rail1 and bottom being rail5: rail1 + rail2 + rail3 + rail4 + rail5
  - If "rails" is equal to 1, return text as-is (with spaces removed).
  - If "rails" is greater than OR equal to the length of the characters, return the text as-is (with spaces removed).
  - Number of "spots" on all the rails will always be equal to the length of the amount of characters in text

Definitions:
  - Encode: takes some text, makes it "unreadable"
  - Decode: takes the "unreadable" text, and makes it readable
  - Rail Fence Cipher: A "transposition" cipher (uses the positioning of characters to encode text)
  - Fence: An imaginary structure that the encoded text will be positioned on
  - Rails: The rows that make up the "fence"
  - "Down": When moving down, rail index increases
  - "Up": When moving up, rail index decreases
  - "Spot": A position on a given rail

Questions:
  - Will the fence always be 3 "rails"?
    - No, number of rails should be passed in as an argument 
  - Will the input text only contain alphabetic characters?
    - Only alphabetic characters and spaces
  - When decoding, how do we determine where a space should go?
    - Do not need to maintain spaces
  - Does case need to be maintained?
    - No case does not matter
  - Will the number of rails ever be 1? If so, should the text remain unchanged?
    - Assume yes. If rails === 1; return text as-is with spaces removed.
  - Will the number of rails ever be < 1? If so, what should I do?
    - Assume no. rails will always be >= 1.
  - If the length of the input text (with spaces removed) is greater than or equal to the number of rails, should I return the input text with spaces removed? - Assume yes.

---- EXAMPLES -----
-- ENCODING --
text --> 'WE ARE DISCOVERED FLEE AT ONCE'
rails --> 3
fence --> An array with 3 (number of rails) subarrays: [ [ ], [ ], [ ] ]
down = true (this means rails index increases with each move, until we reach the bottom row)
railIndex = 0 (starting at the "top rail - or rail #1")
maxRailIndex = `rails` - 1 (will be 2 in this example) (provides stopping point)
chars --> 'WEAREDISCOVEREDFLEEATONCE'
  iterate through chars:
rules:
- fence[railIndex][charIndex] = char
- if `down` is `true`; increment `railIndex` by 1
- else; decrement `railIndex` by 1
- if `railIndex` > `maxRailIndex`;
  - decrement `railIndex` by 2
  - reassign `down` to `false`
- if `railIndex < 0
  - increment `railIndex` by 2
  - reassign `down` to `true`

-- DECODING --
h e l l o w o r l d -->   h . . . . . o . . .
                          . e . . . w . r . .
                          . . l . o . . . l .
                          . . . l . . . . . d
--> [h o e w r l o l l d]
10 chars * 4 rails = 40 spots - 10 chars = 30 empty spaces
Find Pattern Structure (C for char placement)
C . . . . . C . . .
. C . . . C . C . .
. . C . C . . . C .
. . . C . . . . . C

- split `encodedText` into an array of `chars`
- iterate through `denseFence` passing in each `denseRail` (`map`)
  - determine the number of characters that belong in the `denseRail`
    - `let length = denseRail.filter(c => c === '$').length` => 2
  - gather the characters starting at 0 index for a length determined above
    - `chars.splice(0, length).join('')` (splice will mutate `chars` ensuring each iteration gets appropriate chars)

---- DATA STRUCTURES ----
input: string and number
  intermediate: an array where each element is an array that represents a "rail"
output: string

---- ALGORITHM ----
Encoding High Level:
1. Retrieve all the characters from the input text, removing any character that isn't alphabetic
2. Create the structure that will represent the "fence"
3. Move each character to it's respective "rail"
4. Join all the characters from each "rail" together
5. Join all the "rails" together

Encoding Detailed:
1. Retrieve all the characters from the input text, removing any character that isn't alphabetic
  - use /[a-z]/ig to match all alphabetic characters - removing any other characters
  - save into a variable called `chars`

2. Create the structure that will represent the "fence"
  - invoke `createFenceStructure` passing in `rails` and use return value to assign to variable `fence`

3. Move each character to it's respective "rail"
  - create a variable called `down` and assign to `true` (used to determine direction of character placement)
  - create a variable called `railIndex` and assign to 0 (for starting point)
  - create a variable called `maxIndex` and assign to the value of `rails` - 1 (provides stopping point)
  - iterate through each `char` of `chars` (can use `for..of` loop, passing in each `char`)
    - push the `char` into the subarray at the index of `railIndex`: `fence[railIndex].push(char)`
    - if `down === true` ? `railIndex += 1`; else `railIndex -= 1`
    - if `railIndex > maxIndex`:
      - decrement `railIndex` by 2: `railIndex -= 2`
      - reassign `down` to false: `down = false`
    - if `railIndex < 0`:
      - increment `railIndex` by 2: `railIndex += 2`
      - reassign `down` to true: `down = true`

4. Join all the characters from each "rail" together
  - call `flat` on `fence` to flatten array

5. Join all the "rails" together
  - `join` flattened array 

HELPER: createFence(numberOfRails)
  - create an empty array called `result`
  - using a `for` loop create an iterator that starts at 0 and stops when greater than `numberOfRails` (incrementing by 1 each loop)
    - push an empty array into `result`
  - return `result`
*/

function encode(text, rails) {
  const chars = text.match(/[a-z]/ig).join('');
  if (rails === 1 || rails >= chars.length) return chars;

  return composeSparseFence(chars, rails).flat().join('');
}

function composeSparseFence(chars, rails) {
  const fence = createFenceStructure(rails, chars.length);
  let down = true;
  let railIndex = 0;
  const maxIndex = rails - 1;

  chars.split('').forEach((char, charIndex) => {
    fence[railIndex][charIndex] = char;
    down ? railIndex += 1 : railIndex -= 1;
    if (railIndex > maxIndex) {
      railIndex -= 2;
      down = false;
    } else if (railIndex < 0) {
      railIndex += 2;
      down = true;
    }
  });

  return fence;
}

function createFenceStructure(numberOfRails, railLength) {
  const result = [];
  for (let i = 0; i < numberOfRails; i += 1) {
    result.push([]);
  }

  result.forEach(rail => rail.length = railLength);
  return result;
}

function decode(encodedText, rails) {
  if (rails === 1 || rails >= encodedText.length) return encodedText;
  const chars = encodedText.split('');
  const sparseFence = composeSparseFence('$'.repeat(encodedText.length), rails);
  const denseFence = sparseFence.map(fillInSparseFence);
  const completedFence = addCharsToDenseFence(denseFence, chars);
  return getCharsFromFence(completedFence);
}

function getCharsFromFence(fence) {
  const railLength = fence[0].length;
  let result = [];
  for (let i = 0; i < railLength; i += 1) {
    result.push(fence.map(rail => rail[i]));
  }
  return result.map(row => row.join('')).join('').replace(/\./g, '')
}

function addCharsToDenseFence(denseFence, chars) {
    return denseFence.map(denseRail => {
    const length = denseRail.filter(c => c === '$').length;
    const splicedChars = chars.splice(0, length);
    let newRail = denseRail.join('');

    splicedChars.forEach(char => {
      newRail = newRail.replace('$', char);
    });
    return newRail;
  }); // --> [ 'h.....o...', '.e...w.r..', '..l.o...l.', '...l.....d' ]
}

function fillInSparseFence(array) {
  return [...array].map(char => {
    return char === undefined ? '.' : char;
  })
}

// // encode test cases
console.log(encode("WE ARE DISCOVERED FLEE AT ONCE", 3)); // "WECRLTEERDSOEEFEAOCAIVDEN"
console.log(encode("WE ARE DISCOVERED FLEE AT ONCE", 1)); // "WEAREDISCOVEREDFLEEATONCE"
console.log(encode("HI EVERYONE", 2)); // "HEEYNIVROE"
console.log(encode("hi everyone", 2)); // "heeynivroe"
console.log(encode("HI EVERYONE", 3)); // "HENIVROEEY"
console.log(encode("HI", 2)); // "HI"
console.log(encode("hello world", 11)); // 'helloworld'
console.log(encode('hello world', 4)); // 'hoewrlolld'

// decode test cases
console.log(decode("WECRLTEERDSOEEFEAOCAIVDEN", 3)); // "WEAREDISCOVEREDFLEEATONCE"
console.log(decode("WEAREDISCOVEREDFLEEATONCE", 1)); // "WEAREDISCOVEREDFLEEATONCE"
console.log(decode("HEEYNIVROE", 2)); // "HIEVERYONE"
console.log(decode("heeynivroe", 2)); // "hieveryone"
console.log(decode("HENIVROEEY", 3)); // "HIEVERYONE"
console.log(decode("HI", 2)); // "HI"
console.log(decode("helloworld", 10)); // "helloworld"
console.log(decode('hoewrlolld', 4)); // "helloworld"