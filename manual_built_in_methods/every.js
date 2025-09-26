function isOdd(number) {
  return number % 2 === 1;
}

let count = [1, 2, 3, 4, 5];

// Array.prototype.some
// array.some(func(value, index, arr))
// iterates until truthy value -> short circuits & returns true : false

// console.log(count.some(isOdd)); // true - some numbers are odd




// Array.prototype.every
// array.every(func(value, index, arr))
// iterates until falsy value -> short circuits & returns false : true

// console.log(count.every(isOdd)); // false = every number is not odd


function myOwnEvery(array, func) {
  for (let i = 0; i < array.length; i += 1) {
    if (!func(array[i], i, array)) {
      return false;
    }
  }

  return true;
}

let isAString = value => typeof value === 'string';
console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));      // true
console.log(myOwnEvery(['a', 'b', 1], isAString)); // false

function areAllNumbers(array) {
  return myOwnEvery(array, isANumber);
}

function isANumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

console.log(areAllNumbers([1, 5, 6, 7, '1']));             // false
console.log(areAllNumbers([1, 5, 6, 7, 1]));               // true
console.log(areAllNumbers([1, 5, 6, 7, NaN]));             // false