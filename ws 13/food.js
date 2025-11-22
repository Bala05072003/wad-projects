const fs = require("fs");
const readlineSync = require("readline-sync");
const path = "./data/Orders.json";

/**
 * Initialize file if not present
 */
function initOrders() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "[]");
    }
}

/**
 * Place order
 */
function addOrder(id, itemName, qty, price) {
    initOrders();
    let arr = JSON.parse(fs.readFileSync(path, "utf-8"));
    arr.push({ id, itemName, qty, price });
    fs.writeFileSync(path, JSON.stringify(arr, null, 2));
    console.log("Order added.");
}

/**
 * Print total sales
 */
function printTotalSales() {
    initOrders();
    let arr = JSON.parse(fs.readFileSync(path, "utf-8"));
    let total = 0;
    arr.forEach(o => total += o.qty * o.price);
    console.log("Total Sales = ₹" + total);
}

/**
 * Menu driven
 */
function menu() {
    while (true) {
        console.log("\n----- Food Delivery Menu -----");
        console.log("1. Place Order");
        console.log("2. Print Total Sales");
        console.log("3. Exit");

        let ch = readlineSync.questionInt("Enter choice: ");

        if (ch === 1) {
            let id = readlineSync.question("Order ID: ");
            let name = readlineSync.question("Item Name: ");
            let qty = readlineSync.questionInt("Qty: ");
            let price = readlineSync.questionInt("Price: ");
            addOrder(id, name, qty, price);
        } else if (ch === 2) {
            printTotalSales();
        } else {
            console.log("Bye!");
            break;
        }
    }
}

menu(); 
module.exports = { addOrder, printTotalSales, menu };
