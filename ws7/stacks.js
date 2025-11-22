const prompt = require("prompt-sync")({ sigint: true });
let myStack = [];

function menuStack() {
  process.stdout.write("\n===== STACK MENU =====\n");
  process.stdout.write("1. Push element onto stack\n");
  process.stdout.write("2. Pop element from stack\n");
  process.stdout.write("3. Find element and its index\n");
  process.stdout.write("4. Print number of elements in stack\n");
  process.stdout.write("5. Count total integers and floats\n");
  process.stdout.write("6. Fix decimal places of floats\n");
  process.stdout.write("0. Reduce to sum (default)\n");
  process.stdout.write("Enter your choice: ");
  let choice = prompt();
  return choice;
}

function pushStack() {
  let input = prompt("Enter a number (int or float) to push: ");
  let num = parseFloat(input);
  if (!isNaN(num)) {
    myStack.push(num);
    console.log("Pushed:", num);
  } else {
    console.log("Only numeric values are allowed!");
  }
}

function popStack() {
  if (myStack.length === 0) {
    console.log("Stack is empty!");
  } else {
    let popped = myStack.pop();
    console.log("Popped:", popped);
  }
}

function findStack() {
  let val = parseFloat(prompt("Enter number to find: "));
  let found = myStack.find(e => e === val);
  let idx = myStack.findIndex(e => e === val);
  if (found !== undefined) {
    console.log(`Element ${found} found at index ${idx}`);
  } else {
    console.log("Element not found!");
  }
}

function countTypes() {
  let intCount = 0, floatCount = 0;
  myStack.forEach(num => {
    if (Number.isInteger(num)) intCount++;
    else floatCount++;
  });
  console.log(`Integers: ${intCount}, Floats: ${floatCount}`);
}

function fixDecimals() {
  let n = parseInt(prompt("Enter number of decimal places: "));
  myStack = myStack.map(num => Number.isInteger(num) ? num : parseFloat(num.toFixed(n)));
  console.log("Stack after fixing decimals:", myStack);
}

function reduceSum() {
  let sum = myStack.reduce((acc, val) => acc + val, 0);
  console.log("Sum of stack elements:", sum);
}

// Menu loop
while (true) {
  let choice = menuStack();
  switch (choice) {
    case "1": pushStack(); break;
    case "2": popStack(); break;
    case "3": findStack(); break;
    case "4": console.log("Number of elements:", myStack.length); break;
    case "5": countTypes(); break;
    case "6": fixDecimals(); break;
    case "0": reduceSum(); break;
    default: reduceSum(); break;
  }
}
