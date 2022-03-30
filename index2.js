const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function login(password) {
  return password === 'ACcAA2'
}

function* brute(maxLength=6) {
  for (let i=1; i<=maxLength; i++) {
    let rawPassword = createPasswordTemplate(i);
    while(rawPassword) {
      yield convertPassword(rawPassword)
      rawPassword = generatorPassword(rawPassword)
    }
  }
}

function createPasswordTemplate(length) {
  return Array(length).fill(0);
}

function convertPassword(rawPass) {
  let pass = '';
  for (let i of rawPass) {
    pass += allowedChars[i];
  }
  return pass;
}

function generatorPassword(rawPass) {
  for (let i=0; i<rawPass.length; i++) {
    if (rawPass[i] < allowedChars.length - 1) {
      rawPass[i] += 1;
      return rawPass;
    }
    rawPass[i] = 0;
  }
  return null;
}

console.time()
const iterator = brute()
for (let pass of iterator) {
  if (login(pass)) {
    console.log(pass)
    break
  }
}
console.timeEnd()