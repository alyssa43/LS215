// array.sort(func(a, b))
// a => first element for comparison
// b => second element for comparison
// callback func return: -value if a comes before b
//                     : +value of a comes after b
//                     : 0 or NaN if a === b
// (a, b) => a - b for ascending
// (a, b) => b - a for descending
// if callback function is omitted, elements coerced into string and sorted using character's unicode code point value

let studentGrades = [
  { name: 'StudentA', grade: 90.1 },
  { name: 'StudentB', grade: 92 },
  { name: 'StudentC', grade: 91.8 },
  { name: 'StudentD', grade: 95.23 },
  { name: 'StudentE', grade: 91.81 },
];

// function compareGrades(student1, student2) {
//   if (student1.grade < student2.grade) {
//     return 1;
//   } else if (student1.grade > student2.grade) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

// console.log(studentGrades.sort(compareGrades));

// OR inline:

studentGrades.sort((student1, student2) => {
  if (student1.grade < student2.grade) {
    return 1;
  } else if (student1.grade > student2.grade) {
    return -1;
  } else {
    return 0;
  }
});

console.log(studentGrades);
