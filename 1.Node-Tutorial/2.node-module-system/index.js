
// Node.js has a built-in module system that 
// allows you to organize your code into reusable modules. 
// Each file in Node.js is treated as a separate module,
//  and you can export functions, objects, or values from one 
// module and import them into another using the `require` function.

// node.js import everything bydefault as commonjs module system, 
// which means we can use require and module.exports in our code
const firstModule = require("./first-module");

console.log(firstModule.add(10, 20));

try {
  console.log("trying to divide by zero");
  let result = firstModule.divide(0, 10);
  console.log(result, "result");
} catch (error) {
  console.log("Caught an error", error.message);
}

// //module wrapper
// (
//     function(exports, require, module, __filename, __dirname){
//         //your module code goes here
//     }
// )