// Maps - at first glance the `Map` type seems to be the same as the `Object` type. Both allow the storage of key-value pairs. The chief difference between the two is that instances of the `Object` type must have keys that are either Strings or Symbols (we don't currently cover Symbols) while `Map` instances can have key of *any* type. The `Map` type also includes a `size` property that returns the number of key/value pairs present in the `Map` object, while `Object` types do not have a corresponding property.

// The methods and properties you'll need most often with `Map` are:
// The `Map` constructor. We most often call with no arguments `new Map()`
// The `size` property return the number of key/value pairs present.
// The `set(key, value)` method adds a new key and an associated value to a `Map` object. If the key already exists, its value will be changed to the new value.
// The `get(key)` method returns the value currently associated with a given key. If the key does not exist `undefined` is returned.
// The `has(key)` method return `true` if the given key is present in the `Map` object, `false` if it is not.
// The `delete(key)` method removes a key/value pair from the `Map` object based on its key. If the key does not exist `false` is returned; otherwise it returns `true`.
// The `forEach(callback)` method iterates over the `key/value` pairs in a `Map` object. For each pair, it calls the `callback` function with the value, key, and `Map` object as arguments.
// Examples:

const map = new Map();
let obj = { key: 'objectKey' };

// Adding entries
map.set('name', 'Bob');
map.set(42, 'Four score and seven years ago.');
map.set(null, []);
map.set(obj, 'Object Value');

// Retrieving values
console.log(map.get('name')); // Bob
console.log(map.get(42)); // Four score and seven years ago.
console.log(map.get(null)); // []
console.log(map.get(obj)); // Object Value

// Checking size
console.log(map.size); // 4

// Iterating over the map
map.forEach((value, key) => {
  console.log(key, value);
});
// Logs:
// name Bob
// 42 Four score and seven years ago.
// null []
// { key: 'objectKey' } Object Value

// Note that `Map` stores a reference to non-primitive keys.
// Be careful with using the normal object property syntax. The following code demonstrates that the standard property access sytax doesn't work with `Map` objects as you might expect:

let mapTwo = new Map();
mapTwo['xyz'] = 123456;
console.log(map.get('xyz')); // undefined

mapTwo.set('abc', 654321);
console.log(mapTwo['abc']); // undefined

// Sets - In a way, the `Set` type appears to be the same as a `Map` type except it has no values associated with its keys. Conceptually, however, you can think of sets as maps that have no keys; sets are only interested in values and do not rely of keyed access.

// The methods and properties you'll need most often with `Set` are:
// The `Set` constructor. We most often call with no arguments, but we can also create a `Set` by passing an iterable object (such as a string or Array) to the constructor.
// The `size` property returns the number of values present in the `Set` object.
// The `add(value)` method adds a new value. If the value already exists, the `Set` won't be updated.
// The `has(value)` method returns `true` if the given value is present in the `Set` object, `false` if it is not.
// The `delete(value)` method removes a value. If the value does not exist `false` is returned; otherwise it returns `true`.
// The `forEach(callback)` method iterates over the values. For each value, it calls the `callback` function with the value, key (the same as the value), and `Set` object as arguments. It's worth noting that the first two arguments will always be identical.
// The `union(other)` method creates and returns a new `Set` object that contains all of the elements in the calling set as well as all the elements in the `other` set.
// The `intersection(other)` method creates and returns a new `Set` object that contains all of the elements that are in both the calling set and the `other` set.
// Examples:

// Constructor w/ no arguments
const setA = new Set();

// Using `add` to add values to the set
setA.add(1);
setA.add(2);
setA.add(3);

// Check the size and content of setA
console.log(setA.size); // 3
console.log(setA); // Set(3) {1, 2, 3}

// Adding objects to set
let arr = [6, 7];
setA.add(arr);
setA.add(arr);          // arr gets added once
setA.add([8, 9]);
setA.add([8, 9]);       // [ 8, 9 ] gets added twice
console.log(setA.size); // 6
console.log(setA);      // Set(6) { 1, 2, 3, [ 6, 7 ], [ 8, 9 ], [ 8, 9 ] }

// Using 'has' to check for an existing value
console.log(setA.has(2)); // true
console.log(setA.has(4)); // false

// Constructor call using an iterator (array)
const setB = new Set([2, 3, 4, 5]);

// Check the size and content of setB
console.log(setB.size); // 4
console.log(setB);      // Set(4) { 2, 3, 4, 5 }

// Using the 'delete' method to remove an element from setB
setB.delete(4);
console.log(setB.size); // 3
console.log(setB);      // Set(3) { 2, 3, 5 }

// Performing union of setA and setB
const unionSet = setA.union(setB);
console.log(unionSet); // Set(7) {1, 2, 3, [ 6, 7 ], [ 8, 9 ], [ 8, 9 ], 5}

// Performing intersection of setA and setB
const intersectionSet = setA.intersection(setB);
console.log(intersectionSet); // Set(2) { 2, 3 }

// Using 'forEach' to iterate over the elements of setA
setA.forEach(value => {
  console.log(value);
});
// 1
// 2
// 3
// [ 6, 7 ]
// [ 8, 9 ]
// [ 8, 9 ]

// `Set` strores a reference to non-primitive values. Thus, we can add duplicate object values to a `Set`. To prevent adding duplicate elements to a set, you should use references instead of object values.

// SUMMARY 
// `Map` type provides a way to store arbitrary key/value pairs. Unlike an ordinary `Object`, the `Map` type allows keys of any type.

// `Set` type provides a way to create and manipulate sets of arbitrary values of any type. The elements of a `Set` are unique.

// *You will not need `Map` and `Set` for the LS216 assessment. However, you will need to understand them when you get to LS220*



// LSBot Says:
// It's common to wonder why there are multiple ways to store collections of data. The key differences lie in their specific features and intended use cases.

// Map vs. Object
// While both can store key-value pairs, they have important distinctions:

// Key Types: This is the main difference. An Object's keys must be strings or Symbols. If you use another data type (like a number), it gets coerced into a string. A Map, however, allows keys of any data type, including objects, arrays, or numbers, without changing them.
// Size Property: A Map has a built-in size property that easily tells you how many key-value pairs it contains. To get the size of an Object, you have to do more work, like using Object.keys(obj).length.
// Iteration: Maps are built to be easily iterable. While you can iterate over an object's keys, a Map maintains the insertion order of its elements, which can be more predictable.
// Essentially, Map is a more robust and flexible data structure for key-value storage, especially when you need keys that aren't strings.

// (Source: Maps and Sets)

// Set vs. Array
// Both Set and Array are collections of values, but their core purposes are different:

// Uniqueness: A Set can only contain unique values. If you try to add a value that already exists in the Set, the Set remains unchanged. An Array can have any number of duplicate values.
// Purpose: An Array is an ordered list of items, where the order and index of each item matter. A Set is primarily for checking if a value is present in the collection, and for ensuring that there are no duplicates.
// Performance: Checking for the existence of an element is generally faster in a Set than in an Array, especially for large collections.
// You would use a Set when you need to maintain a collection of unique items and quickly check for membership. You would use an Array when you need an ordered list that can contain duplicates.
