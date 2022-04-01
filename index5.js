const allowedChars = ['a', 'b'];

class Queue {
  constructor(concurrency = 2) {
    this.concurrency = concurrency;
  }
  items = []
  count = 0;
  isFound = false;
  isFree = true;
  add(item){
    this.items.push(item);
  }
  execute(){
    if (this.count < this.concurrency) {
      this.count++
      let promise = this.items.shift()
      promise[0](promise[1]).then((result) => this.fulfilled(result))
    } else {
      this.isFree = false;
    }
  }
  fulfilled(result) {
    console.log('fulfilled')
    this.count--
    this.isFree = true
    if (result) {
      this.isFound = true
    }
  }
}

const iterator = brute();
const queue = new Queue();

while (true) {
  if (queue.isFree) {
    let itemObj = iterator.next();
    if (itemObj.done) {
      break;
    }
    queue.add([login, itemObj.value])
    queue.execute()
  }
  if (queue.isFound) {
    console.log('found');
    break;
  }
}



function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  })
}

function getRandomTime(kof){
  return Math.round(Math.random() * kof);
}

async function login(password) {
  const time = getRandomTime(2000);
  await sleep(time);
  return password === 'aa';
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