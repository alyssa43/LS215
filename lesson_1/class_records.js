"use strict";

// Problem: Create a program that prepares a summary given student record data

// Rules:
  // Grading Weights:
  // Exam      => 65%
  // Exercises => 35%

  // Each term has 4 Exams & several exercises
  // Exams have fixed maximum score of 100
  // Exercises have varied maximum scores, and counts
  // Combined total of exercises will be a score of 100

  // To determine a student's grade:
    // 1. Determine student's average Exam score from the 4 exams
    // 2. Sum all of the exercise scores
    // 3. Apply weights to compute student's final percent grade
    // 4. Determine the letter grade equivalent from percentage

  // Grading:
  // Percentage   Letter
  //   93 - 100      A
  //    85 - 92      B
  //    77 - 84      C
  //    69 - 76      D
  //    60 - 68      E
  //     0 - 59      F
  
// Examples:
// exercises          => [20, 15, 40]
// exams              => [90, 80, 95, 71]
// 1. exam average    => 90 + 80 + 95 + 71 = 335 / 4 => 84 (round => 84)
// 2. exercises total => 20 + 15 + 40 => 75
// 3. apply weights   => 84 * .65 + 75 * .35 = 80.85
// 4. round nearest int => 81 => C return => "81 (C)"


// Data Structure:
  // INPUT:
    // let studentScores = {
    //   student1: {
    //     id: <idNumber>,
    //     scores: {
    //       exams: [],
    //       exercises: [],
    //     },
    //   },
    //   student2: {
    //     id: <idNumber>,
    //     scores: {
    //       exams: [],
    //       exercises: [],
    //     },...
    // };
  // OUTPUT: 
    // {
    //   studentGrades: [ '87 (B)', ... ],
    //   exams: [ { average: 75.6, minimum: 50, maximum: 100 }, ...],
    // }

// Algorithm:
// SET UP:
  // Create the data structure for the returned object:
    // { studentGrades: [], exams: [], }
  // Create the data stucture for all exam data:
    // [ [], [], [], [] ]
  
// FIND DATA FOR EACH STUDENT:
  // Gather all `studentScores` keys: Object.keys(studentScores)
  // Iterate through the keys, passing in each key
    // Gather current students scores:
      // exams, exercises = Object.values(studentScores[currentStudent].scores)

// CALCULATE THE STUDENT'S EXAM AVERAGE SCORE (ROUND):
  // sum all exam scores:
    // examTotal = exams.reduce((total, score) => total + score)
  // find the average score: 
    // total / 4
    // round to the nearest integer

// CALCULATE THE STUDENT'S TOTAL EXERCISE SCORE:
  // sum all exercise scores:
    // exerciseTotal = exercises.reduce((total, score) => total + score)

// CALCULATE THE STUDENT'S FINAL PERCENT GRADE (ROUND):
  // examTotal * 0.65 + exerciseTotal * 0.35
  // round to the nearest integer

// DETERMINE THE STUDENT'S LETTER GRADE:
  // if percentage is >= 93
    // A
  // if percentage is >= 85
    // B
  // if percentage is >= 77
    // C
  // if percentage is >= 69
    // D
  // if percentage is >= 60
    // E
  // else
    // F

// COMBINE THE PERCENT GRADE AND LETTER GRADE ( '81 (C)' ):
  // convert the student's percentage into a string:
    // String(percent)
  // concatenate with letter grade:
    // String(percent) + '(' + letterGrade + ')'
  
// ADD FINAL PERCENT AND LETTER GRADE TO SUMMARY
  // summary.studentGrades.push(grade)

// ADD CURRENT STUDENT'S EXAM DATA INTO PREVIOUSLY CREATED EXAM DATA ARRAY
  // iterate through students exam scores, passing in score and index
    // push the current score into the array at the same index within all exam data structure
      // allExamData[index].push(score)

// ASSEMBLE RETURNED DATA STRUCTURE:
  // After all studentKeys have been iterated through
  // Iterate through allExamData array, passing in each exam data subarray
    // find examAverage:
      // sum all scores
      // divide by the length of the array
    // find examMin:
      // sort array by numerical value 
      // return element at the 0 index
    // find examMax:
      // sort array by numerical value
      // return element at the array.length - 1 index
    // assemble structure:
      // { average: examAverage, minimum: examMin, maximum: examMax, }
    // push assembled object into summary.exams array

// Code:

const EXAM_WEIGHT = 0.65;
const EXERCISE_WEIGHT = 0.35;

// Refactored:
const GRADES = { A: 93, B: 85, C: 77, D: 69, E: 60, F: 0, };

function generateClassRecordSummary(scores) {
  const students = Object.values(scores);
  const exams = students.map(student => student.scores.exams);
  const exercises = students.map(student => student.scores.exercises);

  return {
    studentGrades: calculateScores(exams, exercises),
    exams: calculateClassAverage(exams),
  };
}

function collectLowestScore(scores) {
  return Math.min(...scores);
}

function collectHighestScore(scores) {
  return Math.max(...scores);
}

function transposeExams(exams) {
  const transposed = [];

  for (let index = 0; index < exams[0].length; index += 1) {
    transposed.push(collectElementsAtIndex(exams, index));
  };

  return transposed;
}

function collectElementsAtIndex(collection, index) {
  return collection.map(row => row[index]);
}

function calculateClassAverage(exams) {
  const tranposedExams = transposeExams(exams);

  return tranposedExams.map(exam => {
    return {
      average: calculateAverage(exam),
      minimum: collectLowestScore(exam),
      maximum: collectHighestScore(exam),
    };
  });
}

function calculateScores(exams, exercises) {
  const percentages = calculatePercents(exams, exercises);
  return percentages.map(percent => `${percent} (${calculateLetterGrade(percent)})`);
};

function calculateLetterGrade(percentage) {
  const letterGrades = Object.keys(GRADES);
  return letterGrades.find(letter => percentage >= GRADES[letter]);
}

function calculatePercents(exams, exercises) {
  const examAverages = exams.map(exam => Math.round(calculateAverage(exam)));
  const exerciseTotals = exercises.map(calculateSum);
  
  return examAverages.map((average, index) => {
    return Math.round(average * EXAM_WEIGHT + exerciseTotals[index] * EXERCISE_WEIGHT);
  });
}

function calculateSum(scores) {
  return scores.reduce((total, score) => total + score, 0) 
}

function calculateAverage(scores) {
  return Number((calculateSum(scores) / scores.length).toFixed(1));
}

// Original Solution:
// function generateClassRecordSummary(scores) {
//   const summary = { studentGrades: [], exams: [], };
//   const allExamsScores = [ [], [], [], [] ];

//   Object.keys(scores).forEach(student => {
//     addStudentDataToSummary(student, scores, allExamsScores, summary)
//   });
//   allExamsScores.forEach(examScores => addExamDataToSummary(examScores, summary));

//   return summary;
// }

// function addStudentDataToSummary(student, scores, allExamScores, summary) {
//   const { exams: examScores, exercises: exerciseScores } = scores[student].scores;
//   addStudentGradeToSummary(formatGrades(examScores, exerciseScores), summary);
//   addExamDataToExams(examScores, allExamScores);
// }

// function addStudentGradeToSummary(grade, summary) {
//   summary.studentGrades.push(grade);
// }

// function addExamDataToExams(studentExamScores, allExamScores) {
//   studentExamScores.forEach((exam, index) => allExamScores[index].push(exam));
// }

// function addExamDataToSummary(examArray, summary) {
//   const examAverage = Number(average(examArray).toFixed(1));
//   const [ examMin, examMax ] = findMinMax(examArray);

//   summary.exams.push({ average: examAverage, minimum: examMin, maximum: examMax });
// }

// function formatGrades(examScores, exerciseScores) {
//   const percent = calculatePercent(examScores, exerciseScores);
//   const grade = letterGrade(percent);

//   return `${String(percent)} (${grade})`;
// }

// function letterGrade(percent) {
//   if (percent >= 93) {
//     return 'A'
//   } else if (percent >= 85) {
//     return 'B'
//   } else if (percent >= 77) {
//     return 'C'
//   } else if (percent >= 69) {
//     return 'D'
//   } else if (percent >= 60) {
//     return 'E'
//   } else {
//     return 'F'
//   };
// }

// function percentGrade(examAverage, exerciseTotal) {
//   const percentage = examAverage * EXAM_WEIGHT + exerciseTotal * EXERCISE_WEIGHT;
//   return roundToNearestInteger(percentage);
// }

// function findMinMax(numbersArray) {
//   if (!Array.isArray(numbersArray)) return [ 0, 0 ];

//   return [ Math.min(...numbersArray), Math.max(...numbersArray) ];
// }

// function calculatePercent(examScores, exerciseScores) {
//   const examAverage = roundToNearestInteger(average(examScores));
//   const exerciseTotal = sumArray(exerciseScores);

//   return percentGrade(examAverage, exerciseTotal);
// }

// function sumArray(numbersArray) {
//   return numbersArray.reduce((sum, num) => sum + num, 0);
// }

// function average(numbers) {
//   if (numbers.length === 0 || !Array.isArray(numbers)) return 0;

//   return sumArray(numbers) / numbers.length;
// }

// function roundToNearestInteger(number) {
//   return Math.round(number);
// }


// //

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

console.log(generateClassRecordSummary(studentScores));