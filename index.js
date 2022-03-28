const allowedChars = ['a', 'b', 'c', 'A', 'B', 'C'];
let passwords = [];

function login(password) {
  return password === 'aCbAcB';
}

function getPasswords(arr, memo) {
  let current;
  memo = memo || [];
  for (let i = 0; i < arr.length; i++) {
    current = arr.splice(i, 1);
    if (arr.length === 0) {
      passwords.push(memo.concat(current).join(''));
    }
    getPasswords(arr, memo.concat(current));
    arr.splice(i, 0, current[0]);
  }
  return passwords;
}

function brute() {
  getPasswords(allowedChars);
  for (let pass of passwords) {
    if (login(pass)) {
      return pass;
    }
  }
  return null;
}

console.log(brute())
