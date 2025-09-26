function myReduce(array, func, initial) {
  let [value, start] = initial === undefined ? [array[0], 1] : [initial, 0];

  for (let i = start; i < array.length; i += 1) {
    value = func(value, array[i], i, array);
  }

  return value;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

console.log(myReduce([5, 12, 15, 1, 6], smallest));           // 1
console.log(myReduce([5, 12, 15, 1, 6], sum, 10));            // 49

function longestWord(words) {
  return myReduce(words, longest);
}

function longest(result, currentWord) {
  return currentWord.length >= result.length ? currentWord : result;
}

console.log(longestWord(['abc', 'launch', 'targets', '']));      // "targets"