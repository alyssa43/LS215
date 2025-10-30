/*
--- PROBLEM ---
Write a function that takes any two version numbers and returns an Integer that represents if the first given version number is greater than, less than, or equal to the second given version number.

Input: Two version numbers in string representation, version1 and version2
Output: One of the numbers from 1, 0, or -1; or null for invalid inputs

Questions:
  - Will we always be given two version numbers?
  - Will both version numbers be valid?
  - Will both the inputs be strings?
  - How do we handles versions numbers of different lengths?
  - Will the version numbers strings ever be empty? If so, what should I do?

Rules:
  - Legal Version numbers:
    - Can have 1 - 4 components
    - Components are separated by a '.'
  - Illegal Version numbers, return null:
    - contain characters other than digits and the '.' separator
  - The following should be returned:
    - if version1 is less than version2, return `-1`
    - if version1 is greater than version2, return `1`
    - if version1 is equal to version2, return `0`
    - If given an invalid version number, return `null`

---- EXAMPLES ----
0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

---- DATA STRUCTURES ----
Input: Strings: '1.2.3'

Split version numbers into Array of Stringdigitis: '1.2.3' -> ['1', '2', '3']

Output: Integer's 0, 1, or -1 - OR - null

---- ALGORITHM ----
High Level:
1. Parse the input version numbers into the correct data structure
2. Compare version numbers
3. Stop if a version number is illegal
4. Determine if version number 1 is greater than, less than, or equal to version number 2

Detailed:
1. Parse the input version numbers into the correct data structure
  - If either version number is undefined, return null
  - Split the version numbers into their components, based on a single period

2. Stop if a version number is illegal
  HELPER: isLegalVersionNumber
  - If either version number components contain anything other than digits, return null 

3. Determine if version number 1 is greater than, less than, or equal to version number 2
  - Iterate starting at 0, and stopping at the length of the longest components array
    - Find the first components of version1 and version2
    - If a component at that index doesn't exist - give it a value of 0
    - Using each components numerical value:
    - If version1 component is greater than version2 component
      - Stop iterating and return 1
    - If version1 component is less than version2 component
      - Stop iterating and return -1
    - Otherwise, continue to the next set of components
  - If we make it through all iterations without returning a value, return 0
*/

function compareVersions(version1, version2) {
 if (!areLegalVersionNumbers(version1, version2)) return null;
  
 const [v1Components, v2Components] = parseVersions(version1, version2);
 const iterations = Math.max(v1Components.length, v2Components.length);

 for (let i = 0; i < iterations; i += 1) {
  [v1Comp, v2Comp ]= [v1Components[i] || 0, v2Components[i] || 0];

  if (v1Comp > v2Comp) {
    return 1;
  } else if (v1Comp < v2Comp) {
    return -1;
  }
 }

 return 0;
}

function parseVersions(...versions) {
  return versions.map(version => version.split('.').map(Number));
}

function areLegalVersionNumbers(version1, version2) {
  const legalChars = /^[0-9]+(\.[0-9]+)*$/;
  return legalChars.test(version1) && legalChars.test(version2);
}

// ---- TEST CASES ----

// Less Than
console.log(compareVersions('0.1', '1') === -1);
console.log(compareVersions('1.0', '1.1') === -1);
console.log(compareVersions('1.1', '1.2') === -1);
console.log(compareVersions('1.2.0.0', '1.18.2') === -1);
console.log(compareVersions('1.18.2', '13.37') === -1);
console.log(compareVersions('2.3.4', '2.3.5') === -1);
console.log(compareVersions('1.0.0', '1.1') === -1);
console.log(compareVersions('1.0', '1.0.5') === -1);

// Greater Than
console.log(compareVersions('1', '0.1') === 1);
console.log(compareVersions('1.1', '1.0') === 1);
console.log(compareVersions('1.2', '1.1') === 1);
console.log(compareVersions('1.18.2', '1.2.0.0') === 1);
console.log(compareVersions('13.37', '1.18.2') === 1);

// Equal
console.log(compareVersions('1', '1') === 0);
console.log(compareVersions('1', '1.0') === 0);
console.log(compareVersions('1.2', '1.2.0.0') === 0);

// Edge Cases
console.log(compareVersions('1.2i.2', '1.3') === null);
console.log(compareVersions('1.2O', '1.20') === null);
console.log(compareVersions('1..2.0.1', '1.2.0.1') === null);
console.log(compareVersions('1,2,3', '1.2.3') === null);
console.log(compareVersions('.1', '1') === null); 
console.log(compareVersions('1.2') === null);
console.log(compareVersions() === null);