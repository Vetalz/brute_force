const allowedChars = ['a', 'b'];

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  })
}

function getRandomTime(kof){
  return Math.round(Math.random() * kof);
}

async function login(password) {
  const time = getRandomTime(5000);
  await sleep(time);
  return password === 'bb';
}

function* brute(maxLength=2) {
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

const iterator = brute()
for (let pass of iterator) {
  login(pass).then((result) => {
    console.log('try pass:', pass)
    if (result) {
      console.log('correct pass:', pass);
    }
  })
}