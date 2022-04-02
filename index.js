const allowedChars = ['a', 'b', 'c', 'A', 'B', 'C'];
let passwords = [];

function login(password) {
  return password === 'aCbAcB';
}

function getPasswords(arr, maxLength, str='') {
  if (str.length === maxLength) {
    passwords.push(str)
    return;
  }
  for(let i of arr) {
    getPasswords(arr, maxLength,str+i)
  }
}

function brute(maxLength=6) {
  for(let i=1; i<=maxLength; i++) {
    getPasswords(allowedChars, i);
  }
  for (let pass of passwords) {
    if (login(pass)) {
      return pass;
    }
  }
  return null;
}

console.log(brute())
