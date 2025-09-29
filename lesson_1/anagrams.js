// Problem: Given a string (`word`) and an array of strings, return an array that selects all of the strings that are an anagram of the given string `word`.
// Rules: 
  // an anagram has all the same letters of given string - order doesn't matter
  
// Algorithm:
// STEP 1: Transform the input string into an array of characters
// STEP 2: Sort the characters alphabetically
// STEP 3: Iterate through array of strings to perform transformation
// STEP 4: Transform the current string into an array of characters
// STEP 5: Select current string if the two arrays have identical values & length


// -> STEP <-  -> Abstraction <-  -> Method <-
//      1        Transformation      split
//      2        Sorting             sort
//      3        Filtering           filter           
//      4        Transformation      split
//      5        Comparison          ===

function anagram(word, list) {
  return list.filter(candidate => areAnagrams(candidate, word));
}

function areAnagrams(source, target) {
  let sourceLetters = source.split('').sort();
  let targetLetters = target.split('').sort();
  return compareArrays(sourceLetters, targetLetters);
}

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) return false;
  return array1.every((value, index) => value === array2[index]);
}

console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]