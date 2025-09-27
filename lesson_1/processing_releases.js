let newReleases = [
  {
    'id': 70111470,
    'title': 'Die Hard',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 654356453,
    'boxart': 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
  {
    'title': 'The Chamber',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 675465,
    'title': 'Fracture',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
];

function processReleaseData(data) {
  let movies = data.filter(movie => movie.id && movie.title);
  let newData = movies.map(movie => {
    return { 
      id: movie.id, 
      title: movie.title,
    };
  });

  return newData;
}

console.log(processReleaseData(newReleases));

// should return:
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];

// Problem: Write a function that, given an array of movie objects, returns a new array that contains movie objects that contain only the `id` and `title` key/value pairs of the given array.
// Rules:
  // When `id` exists; it will always be an integer greater than 0
  // When `title` exists: it will always be a non-empty string
  // Keep only movies that have both `id` and `title` properties
  // Returned array should only contain objects with 2 properties: `id` and `title`

// Algorithm:
// STEP 1: Select all movie objects that have both `id` and `title` properties
// STEP 2: Keep only the `id` and `title` properties
// STEP 3: Transform object into new object with `id` and `title`

// -> STEP <-  -> Abstraction <-  -> Method <-
//      1        Selection          filter
//      2        Transformation     map