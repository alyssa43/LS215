// indexOf : This method returns the first numeric index of a character or substring of characters within a string. If the search character or substring doesn't exist, returns -1.

let language = 'JavaScript';

language.indexOf('S');   // 4
language.indexOf('s');   // -1
language.indexOf('ipt'); // 7

// lastIndexOf : This method returns the index of that last occurrence of a character or substring. Returns -1 if the search character or substring doesn't exist.

let state = 'Mississippi';

state.lastIndexOf('i');  // 10
state.lastIndexOf('s');  // 6
state.lastIndexOf('sp'); // -1

// replace : This method performs a substitution operation on the original string, and returns the result as a new string. By default, `replace` substitutes the first occurrence of the substring or regular expression pattern given by the first argument with the value specified by the second argument. `replace` does not modify the original string.

state.replace('s', 'q'); // 'Miqsissippi'

  // Note that this only replaces the first `s`. To replace every instance of `s`, we must use a regular expression with `replace`. Regular expressions can get complicated, but in many cases you can just replace the quote characters with forward slash characters (`/`) to convert the search string to a regular expression. If you then append a `g` to the regular expression, `replace` will replace every matching substring with the replacement value.

state.replace(/s/g, 'q'); // 'Miqqiqqippi'

  // Alternatively, we can now use the `replaceAll` String method

// split : This method splits the string into an array of strings based on a separator. If you supply a string, `split` parses the string by breaking it at each occurrance of the separator string. If the separator string is an empty string, it splits the string into an array of single character strings. As with the replace method, you can also use a regular expression to identify the separator. This is useful when you need something more complex than a simple constant substring. Note that the returned array does not include instance of the separator string.

state.split('');   // ["M", "i", "s", "s", "i", "s", "s", "i", "p", "p", "i"]
state.split('s');  // ["Mi", "", "i", "", "ippi"]
'1, 2, 3, 4, 5, 6'.split(', ');  // ["1", "2", "3", "4", "5", "6"]

// substring : extracts and returns a portion of the original string that lies in the range specified by its two numeric arguments. The arguments provide the starting and ending indexes of the string you wish to extract from the original string. The extracted string starts with the character at the smaller index of the two arguments, and ends just before the character at the larger index of the two values. This means that:

string.substring(a, b) === string.substring(b, a);

// For any two valid values of `a` and `b`. Note specifically that `substring` does not return the character at the larger index value: the last character included is the one just prior to that index.

state.substring(6, 3); // 'sis' - starting at index 3 and ending at the one before index 6

// toUpperCase and toLowerCase : These methods let you change the letters in a string to uppercase or lowercase. Both methods leave other characters unchanged.

let exclamation = "Go team! We're number 1!";

exclamation.toUpperCase(); // "GO TEAM! WE'RE NUMBER 1!"
exclamation.toLowerCase(); // "go team! we're number 1!"