const allowedChars = ['a', 'b', 'c', 'd'];

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
  return password === 'aabc';
}

function* brute(maxLength=4) {
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


class Queue {
  constructor(concurrency = 20) {
    this.concurrency = concurrency;
  }

  tasks = [];
  isFound = false;
  processing = 0;
  callback;

  add(task) {
    this.tasks.push(task);
    this.execute()
  }

  execute() {
    if (this.isEmpty() || this.isFound) {
      return;
    }
    if (this.processing >= this.concurrency) {
      return;
    }
    this.processing++;
    const task = this.tasks.shift();
    const [callback, args] = task;
    callback(...args).then((result) => {
      console.log('fulfilled:', args[0]);
      this.processing--;
      this.execute();
      this.callback([result, args[0]])
    });
    console.log('promise:', args[0]);
  }

  isEmpty() {
    return this.tasks.length === 0;
  }

  onFulfilled(callback) {
    this.callback = callback;
  }
}

const iterator = brute();
const queue = new Queue();

for (let i=0; i<queue.concurrency; i++) {
  let itemObj = iterator.next();
  queue.add([login, [itemObj.value]]);
}
queue.onFulfilled((result) => {
  if(result[0]) {
    queue.tasks = [];
    console.log(result[1]);
    queue.isFound =true;
    return;
  }
  let itemObj = iterator.next();
  if(itemObj.done) {
    console.log('password not found');
    return;
  }
  queue.add([login, [itemObj.value]]);
})