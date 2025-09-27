let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141


// Problem: Calculate the total area within a list of dimensions. 
// STEP 1: For each rectangle, determine its area
// STEP 2: Sum all of the rectangles areas

// -> STEP <-  -> Abstraction <-  -> Method <-
//      1       Transformation        map
//      2       Reduction             reduce


function totalArea(rectangles) {
  let areas = rectangles.map(rectangle => rectangle[0] * rectangle[1]);
  return areas.reduce((sum, area) => sum + area);
}

// Problem: Calculate the total area of only the squares within a list of dimensions.
// STEP 1: Find all the dimensions that are squares
// STEP 2: For each square, determine its area
// STEP 3: Sum all of the squares areas

// -> STEP <-  -> Abstraction <-  -> Method <-
//      1        Selection          filter
//      2        Transformation     map
//      3        Reduction          reduce

function totalSquareArea(rectangles) {
  let squares = rectangles.filter(rectangle => rectangle[0] === rectangle[1]);
  return totalArea(squares);
}

console.log(totalSquareArea(rectangles));    // 121