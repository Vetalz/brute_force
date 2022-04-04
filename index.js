const allowedChars = ['a', 'b', 'c', 'A', 'B', 'C'];

function login(password) {
  return password === 'aCbAcB';
}

function getPasswords(arr, maxLength, passwords, str='') {
  if (str.length === maxLength) {
    passwords.push(str)
    return;
  }
  for(let i of arr) {
    getPasswords(arr, maxLength, passwords,str+i)
  }
}

function brute(maxLength=6) {
  let passwords = [];
  for(let i=1; i<=maxLength; i++) {
    getPasswords(allowedChars, i, passwords);
  }
  for (let pass of passwords) {
    if (login(pass)) {
      return pass;
    }
  }
  return null;
}

console.log(brute())
