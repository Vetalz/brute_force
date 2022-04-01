class Queue {
  constructor(concurrency = 20) {
    this.concurrency = concurrency;
  }

  tasks = [];
  processing = 0;
  callback;

  add(task) {
    this.tasks.push(task);
    this.execute()
  }

  execute() {
    if (this.isEmpty()) {
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

const queue = new Queue();

for (let i=0; i<200; i++) {
  queue.add([login, [i]])
}

queue.onFulfilled((result) => {
  if(result[0]) {
    queue.tasks = [];
    console.log(result[1])
  }
})




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
  return password === 15;
}