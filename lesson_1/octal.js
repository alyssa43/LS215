// Problem: Given a String that represents an octal number, return a Number that represents the decimal version of that value
// Rules:
  // You must manually convert the value

// Examples:
// Given: '130' => Return: 88
// 130 digits => [1, 3, 0] => reversed => [0, 3, 1]
// index 0, value 0 => value * 8^index => 0 * 8^0 = 0 * 1 = 0
// index 1, value 3 => value * 8^index => 3 * 8^1 = 3 * 8 = 24
// index 2, value 1 => value * 8^index => 1 * 8^2 = 1 * 64 = 64
// 0 + 24 + 64

// Algorithm:
// STEP 1: Transform the input string into a number
// STEP 2: Transform the number into the reverse order of its digits
// STEP 3: Transform the digits value based on its index
// STEP 4: Calculate the sum of all the values

// -> STEP <-  -> Abstraction <-  -> Method <-
//      1        Transformation      Number()
//      2        Transformation      String(), split(''), reverse
//      3        Transformation      map
//      4        Reduction           reduce

function octalToDecimal(numberString) {
  const BASE = 8;

  return numberString.split('').reverse().reduce((sum, digitChar, index) => {
    return sum + Number(digitChar) * (BASE ** index);
  }, 0);

  // let digits = numberString.split('').reverse();
  // let values = digits.map((value, index) => Number(value) * (BASE ** index));
  // return values.reduce((acc, value) => acc + value);
}

console.log(octalToDecimal('1'));           // 1
console.log(octalToDecimal('10'));          // 8
console.log(octalToDecimal('130'));         // 88
console.log(octalToDecimal('17'));          // 15
console.log(octalToDecimal('2047'));        // 1063
console.log(octalToDecimal('011'));         // 9