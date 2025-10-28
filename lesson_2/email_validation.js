// function isValidEmail(email) {
//   if (count(email, '@')!== 1) return false;
//   const [ local, domain ] = email.split('@');

//   return isValidLocal(local) && isValidDomain(domain);
// }

// function isValidLocal(local) {
//   return local.length >= 1 && isAlphaNumericOnly(local);
// }

// function isValidDomain(domain) {
//   const components = domain.split(/\b\.\b/);
//   return components.length >= 2 && 
//          components.every(isAlphabeticOnly);
// }

// function count(string, pattern) {
//   return (string.match(new RegExp(pattern, 'g')) || []).length;
// }

// function isAlphabeticOnly(string) {
//   return !string.match(/[^a-z]/ig);
// }

// function isAlphaNumericOnly(string) {
//   return !string.match(/[^a-z0-9]/ig);
// }

function isValidEmail(email) {
  return /^[a-z0-9]+@[a-z]+\.[a-z]+(\.[a-z]+)*$/i.test(email);
}

console.log(isValidEmail('Foo@baz.com.ph') === true); 
console.log(isValidEmail('Foo@mx.baz.com.ph') === true);
console.log(isValidEmail('foo@baz.com') === true);
console.log(isValidEmail('foo@baz.ph') === true);
console.log(isValidEmail('foo@baz@bar.ph') === false);
console.log(isValidEmail('HELLO123@baz') === false);    
console.log(isValidEmail('foo.bar@baz.to') === false);
console.log(isValidEmail('foo@baz.') === false);   
console.log(isValidEmail('foo_bat@baz') === false);       
console.log(isValidEmail('foo@bar.a12') === false);      
console.log(isValidEmail('foo_bar@baz.com') === false);
console.log(isValidEmail('foo@bar.....com') === false);

console.log(isValidEmail('foo@bar.com.') === false);

// console.log(isValidEmail('Foo@baz.com.ph'));    
// console.log(isValidEmail('Foo@mx.baz.com.ph')); 
// console.log(isValidEmail('foo@baz.com'));       
// console.log(isValidEmail('foo@baz.ph'));        
// console.log(isValidEmail('foo@baz@bar.ph')); 
// console.log(isValidEmail('HELLO123@baz'));      
// console.log(isValidEmail('foo.bar@baz.to'));    
// console.log(isValidEmail('foo@baz.'));          
// console.log(isValidEmail('foo_bat@baz'));       
// console.log(isValidEmail('foo@bar.a12'));       
// console.log(isValidEmail('foo_bar@baz.com'));   
// console.log(isValidEmail('foo@bar.....com'));  