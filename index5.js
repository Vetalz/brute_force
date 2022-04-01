class Queue {
  constructor(concurrency = 20) {
    this.concurrency = concurrency;
  }

  tasks = [];
  count = 0;

  add(task) {
    this.tasks.push(task);
    this.execute()
  }

  isFree() {
    return this.count < this.concurrency;
  }

  execute() {
    if (this.count < this.concurrency) {
      this.count++;
      const task = this.tasks.shift()
      const [callback, args] = task;
      callback(...args).then((result) => this.fulfilled(result, task))
      console.log('promise:', args[0])
    }
  }

  fulfilled(result, args) {
    console.log('fulfilled:', args[1][0]);
    if (!this.isDone()) {
      return;
    }
    this.count--;
    this.execute();
  }

  isDone() {
    return this.tasks.length;
  }
}

const queue = new Queue();

for (let i=0; i<200; i++) {
  queue.add([login, [i]])
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