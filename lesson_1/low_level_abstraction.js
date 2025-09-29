function isAllUnique(string) {
  const collected = {};

  for (let index = 0; index < string.length; index += 1) {
    let char = string[index].toLowerCase();

    if (collected[char]) {
      return false;
    } else {
      collected[char] = true;
    };
  };

  return true;
}

console.log(isAllUnique('The quick brown fox jumped over a lazy dog'));  // false
console.log(isAllUnique('123,456,789'));                                 // false
console.log(isAllUnique('The big apple'));                               // false
console.log(isAllUnique('The big apPlE'));                               // false
console.log(isAllUnique('!@#$%^&*()'));                                  // true
console.log(isAllUnique('abcdefghijklmnopqrstuvwxyz'));                  // true

// QUESTION: Why do we say that keeping track of characters with an object and a manual loop is "lower-level" than using built-in array methods?

// ANSWER: We call it "lower-level" because it works closer to the basic operations—manually iterating over the string and explicitly managing the state of seen characters—rather than relying on higher-level built-in array methods that abstract away those details and handle iteration and checking internally. This approach gives you more control and allows early exit, which some high-level methods don't support as directly.