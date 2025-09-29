// Problem: Given an array of band objects, return an Array with the corrected data:
// How to fix the `bands` data:
  // The `country` properties should all have the value `'Canada'`
  // The `name` properties values should be all words capitalized
  // All period in the `name` property values should be removed

// Algorithm:
// STEP 1: Transform the given array to fix the data
// STEP 2: Reassign the `country` property 
// STEP 3: Retrieve value of the `name` property
// STEP 4: Transform `name` value into array of words
// STEP 5: Transform each word to be capitalized
// STEP 6: Transform array of capitalized words back to a string
// STEP 7: Remove any periods in the name property


// -> STEP <-  -> Abstraction <-  -> Method <-
//      1        Transformation      map
//      2        Reassignment        band.country = 'Canada'
//      3        Value retrieval     band.name          
//      4        Transformation      split
//      5        Transformation      map
//      6        Transformation      join
//      7        Character Removal   replace


let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processBands(data) {
  return data.map(band => {
    let capitalizedName = capitalizePhrase(band.name);
    let fixedBandName = removeDotsInString(capitalizedName);

    return {
      name: fixedBandName,
      country: 'Canada',
      active: band.active,
    };
  });
}

function capitalizePhrase(phrase) {
  return phrase.split(' ').map(capitalizeString).join(' ');
}

function capitalizeString(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function removeDotsInString(string) {
  return string.replace(/\./g, '');
}

console.log(processBands(bands));

// should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]
