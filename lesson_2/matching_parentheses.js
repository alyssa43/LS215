function isBalanced(string) {
  const parentheses = string.match(/(\(|\))/g) || [];
  let tally = 0;
  
  for (let i = 0; i < parentheses.length; i += 1) {
    parentheses[i] === '(' ? tally += 1 : tally -= 1;
    if (tally < 0) return false;
  }

  return tally === 0;
}

console.log(isBalanced('What (is) this?'));        // true
console.log(isBalanced('What is) this?'));         // false
console.log(isBalanced('What (is this?'));         // false
console.log(isBalanced('((What) (is this))?'));    // true
console.log(isBalanced('((What)) (is this))?'));   // false
console.log(isBalanced('Hey!'));                   // true
console.log(isBalanced(')Hey!('));                 // false
console.log(isBalanced('What ((is))) up('));       // false


