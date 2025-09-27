// Consider this Array of names:
let names = ['Heather', 'Gisella', 'Katsuki', 'Hua', 'Katy', 'Kathleen', 'Otakar'];

// If we want to determine which letter is the most frequent starting letter of the names in this list, we can break the problem down into several steps:
// STEP 1. For each name in the list, determine its first letter.
// STEP 2. Count the occurrences of each first letter.
// STEP 3. Find the first letter that occurs most often.

// Think about the inputs and outputs of each step

// -> STEP <-    -> RESULT <-
//      1     - Array of first letters
//      2     - Object containing letters as keys and counts as values
//      3     - Letter with largest number of occurrences

// Now with the steps and inputs, find suitable abstraction and method

// -> STEP <-  -> Abstraction <-  -> Method <-
//      1       Transformation        map
//      2       Reduction             reduce
//      3       Reduction             reduce

// Now lets put things together in code:

// Step 1:
let letters = names.map(name => name[0]); // ['H', 'G', 'K', 'H', 'K', 'K', 'O']

// Step 2:
let counts = letters.reduce((obj, letter) => {
  obj[letter] = obj[letter] + 1 || 1;
  return obj;
}, {}); // { H: 2, G: 1, K: 3, O: 1 }

// Step 3:
let letter = Object.keys(counts).reduce((lastLetter, currentLetter) => {
  if (counts[lastLetter] > counts[currentLetter]) {
    return lastLetter;
  } else {
    return currentLetter;
  }
}); // K