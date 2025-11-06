// Problem Description
// Write a function that returns the position of the closest active opponent. If two opponents are equidistant, return the opponent with the higher position on the board.

// Examples / Test Cases

/*
---- PROBLEM ----
input: 
  - `positions`: object literal
  - `position` : number
output: number

Definitions:
  - opponent: represented by a key within the `positions` object
  - opponents position: represented by the opponents value for the given key within the `positions` object
  - equidistant: The difference between the given `position` and the opponents positions are equal
    EX: "Opponent 1a" : 1 "Opponent 1b" : 5 --> position = 3 3 - 1 = 2 & 5 - 3 = 2 
  - higher position: The position with a greater numeric value 
    EX: 3 and 5 are "equidistant" so we return the "higher" position --> 5
  - board: represented by the `positions` object - each positions is correlated to an integer 

Questions:
  - Will there always be 2 arguments provided? If not, how shall I proceed?
    - Yes, there will always be precisely 2 arguments
  - Will both arguments always be an object and an integer?
    - Yes.
  - Will the `positions` on the board always be an integer?
    - Yes. (or `null` for exterminated opponents)
  - Will the `positions` on the board always be greater than 0?
    - Yes.
  - When a `position` is `null` do I ignore that position?
    - opponents with `null` positions are not active opponents. Active opponents have numeric positions.
  - Is it possible that all opponents are not active? 
    - No, you can assume that there will always be at least 1 active opponent.
  - Will there ever only be 1 position in the `positions` object? If so, should I return the only position?
    - Assume, yes.
  - WIll there ever be an empty `positions` object? If so, what should I return?
    - Yes, that is possible. Return `null`
  - Can we assume the opponents name will always consist of "opponent ${num}"?
    - No, the opponent name could be any valid object key
  - Can two opponents share the same position?
    - No.
  
Rules:
  - Opponent names are represented as keys within the `positions` object
    - Opponent names appear to be irrelevant to the `findClosestOpponent` function (we don't use them)
  - Opponent positions are represented as values within the `positions` object
  - If the `positions` object is empty; return null
  - If an opponents position is null; they have been exterminated and therefore irrelevant
  - If the `positions` object only contains one (active) opponent; return that opponents position
  - An opponent's name can be any valid object key

---- EXAMPLES ----
positions --> {"Opponent 1" : 1, "Opponent 2" : 15, "Opponent 3" : 37}
position  -->  10
[1, 15, 37] --> calculate their `positionDistance`
 --> 0 index 1  --> Absolute value of  1 - 10 = 9
 --> 1 index 15 --> Absolute value of 15 - 10 = 5
 --> 2 index 37 --> Absolute value of 37 - 10 = 27
    position distances --> [9, 5, 27]
    save closestDistance --> Math.min(...positionDistances) --> 5
[1, 15, 37] --> select position(s) that have a `positionDistance === closestDistance`
  --> [15] --> return highest (and in this case - the only) value

positions --> { "Opponent 1a" : 1,  "Opponent 1b" : 5 "Opponent 1c" : 10}
position  --> 3
[1, 5, 10] --> calculate their `positionDistance`
  --> 0 index 1  --> Absolute value of  1 - 3 = 2
  --> 1 index 5  --> Absolute value of  5 - 3 = 2
  --> 2 index 10 --> Absolute value of 10 - 3 = 7
    positionDistances --> [ 2, 2, 7 ]
    save closestDistance --> Math.min(...positionDistances) --> 2
[1, 5, 10] --> select positions that have a `positionDistance === closestDistance`
  --> [1, 5] --> return highest value --> 5

---- DATA STRUCTURES ----
input:
  - object literal where keys are opponent names and values are their respective positions
  - number representing an object on the board

intermediate:
  - array of all (active) opponent positions

output:
  - number representing the closest (and highest) opponent position to the given `position`

---- ALGORITHM ----
High Level:
1. Gather all the active opponent positions
2. If there are 0 active opponent positions; return `null`
3. Find the (abs value) difference of each active opponents position and the given `position`
4. Find the position with the smallest difference
5. Find the positions that have a position distance that is equal to the smallest difference in positions

Detailed:
1. Gather all the active opponent positions
  - use `Object.values(positions)` to retrieve all positions
  - use `filter` to select only the positions with a truthy value
  - save into a variable called `active`

2. If there are 0 active opponent positions; return `null
  - If `active` is empty; return `null`

3. Find the (abs value) difference of each active opponents position and the given `position`
  - Using `map` iterate through the `active` array, passing in each `current`
    - invoke the `positionDistance` helper method on each `current` and use return value for transformation
  - save the returned transformed array into a variable called `distances`

4. Find the position with the smallest difference
  - invoke `Math.min(...distances)` to find the smallest difference within `distances`
  - save into a variable called `closestDistance`

5. Find the positions that have a position distance that is equal to the smallest difference in positions
 - use `filter` to select the positions that have a `positionDistance` (HELPER) that is equal to the `closestDistance`
 - return the highest value of the filtered positions

HELPER: positionDistance(currentPosition, position) (returns absolute value difference in positions)
  - calculate the absolute value of `currentPosition - position` and return
*/

function findClosestOpponent(positions, position) {
  const active = Object.values(positions).filter(pos => pos !== null);
  if (active.length === 0) return null;

  const distances = active.map(current => positionDistance(current, position));
  const closestDistance = Math.min(...distances);
  const closest = active.filter(current => {
    return positionDistance(current, position) === closestDistance;
  });

  return Math.max(...closest);
}

function positionDistance(currentPosition, position) {
  return Math.abs(currentPosition - position);
}

console.log(findClosestOpponent({
  "Opponent 1" : 1,
  "Opponent 2" : 15,
  "Opponent 3" : 37
}, 10)); // 15

console.log(findClosestOpponent({
  "Opponent 1a" : 1,
  "Opponent 1b" : 5
}, 3)); // 5

console.log(findClosestOpponent({
  "Opponent 1a" : 1, "Opponent 1b" : 5,
  "Opponent 1c" : 50, "Opponent 1d" : 100, "Opponent 1e" : null
}, 150)); // 100

console.log(findClosestOpponent({}, 74)); // null

console.log(findClosestOpponent({
  "Atlas" : 1,
  "Luna" : 15,
  "" : 37
}, 10)); // 15

console.log(findClosestOpponent({
  "Opponent 1a" : null, "Opponent 1b" : 5, "Opponent 1c" : null,
  "Opponent 1d" : null, "Opponent 1e" : 200, "Opponent 1f" : 400
}, 300)); // 400

console.log(findClosestOpponent({"Opponent 1" : null, "Opponent 2" : 50,}, 1)); // 50

console.log(findClosestOpponent({"Opponent 1" : 50,}, 1)); // 50