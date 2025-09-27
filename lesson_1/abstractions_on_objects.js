// JS doesn't have a set of built-in higher-order function for Objects as it does for Array. However, you can use `Object.key` to work with object with higher level abstractions

// Iteration - to iterate over an object's keys and values, use `Object.keys` to get an array of keys, and then call `forEach` on that Array:
let myObject = { a: 1, b: 2, c: 3 };

Object.keys(myObject).forEach(key => {
  console.log(`key: ${key}, value: ${myObject[key]}`);
});

// Logs:
// key: a, value: 1
// key: b, value: 2
// key: c, value: 3

// Keys or Values as Arrays:
// If you have an Object but only need to work with its keys or values, use `Object.keys` and `Object.values` respectively
let keys = Object.keys(myObject); // ['a', 'b', 'c']
let values = Object.values(myObject); // [1, 2, 3]

// Map, Reduce, Filter, and More?
// If you want to iterate over an Object's keys or values, you'll have to create your own custom functions to build up a new data structure:

// map to a new object with values doubled
function doubleObjectValues(object) {
  let objEntries = Object.entries(object);
  let objMapped = objEntries.map(([key, val]) => [key, val * 2]);

  return Object.fromEntries(objMapped);
}

doubleObjectValues(myObject); // { a: 2, b: 4, c: 6 }

// filter an object to select only values with even numbers
function keepEvenValues(object) {
  let objEntries = Object.entries(object);
  let objFilterd = objEntries.filter(([key, val]) => val % 2 === 0);

  return Object.fromEntries(objFilterd);
}

keepEvenValues(myObject); // { b: 2 }

// reduce an invoice of objects
function getTotalFromInvoice(invoice) {
  let total = Object.values(invoice).reduce((total, value) => total + value);

  return {total: total};
}

let invoice = { phone: 10000, internet: 8000, tax: 3000};
getTotalFromInvoice(invoice); // { total: 21000 }