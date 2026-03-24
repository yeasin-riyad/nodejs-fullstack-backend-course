// run this code using the command: node index.js

console.log("hello node js");

const array = [1, 2, 3, 4];

console.log(array, "array");

setTimeout(() => {
  console.log("this message is delayed by 2 seconds");
}, 2000);

console.log("this is the last line of the sync code");


// to run node in watch mode, use the command: node --watch index.js
// to run node with a specific file, use the command: node index.js
// to run javascript code in terminal, use the command: node