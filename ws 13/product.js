const fs = require("fs");
const path = "./data/Prod.csv";

/**
 * Create new product CSV file (override old)
 */
function createCSV() {
    fs.writeFileSync(path, "ProdID,Description,Price,Stock\n");
    console.log("Prod.csv created.");
}

/**
 * Add new product
 */
function addProduct(id, desc, price, stock) {
    const data = `${id},${desc},${price},${stock}\n`;
    fs.appendFileSync(path, data);
    console.log("Product added.");
}

/**
 * Search products below stock = 10
 */
function getLowStockItems() {
    const lines = fs.readFileSync(path, "utf-8").trim().split("\n");
    const low = [];

    for (let i = 1; i < lines.length; i++) {
        const [id, desc, price, stock] = lines[i].split(",");
        if (parseInt(stock) < 10)
            low.push({ id, desc, price, stock });
    }
    return low;
}

/**
 * Update stock of a given product
 */
function updateStock(id, newStock) {
    let lines = fs.readFileSync(path, "utf-8").trim().split("\n");
    for (let i = 1; i < lines.length; i++) {
        let cols = lines[i].split(",");
        if (cols[0] === id) {
            cols[3] = newStock;
            lines[i] = cols.join(",");
        }
    }
    fs.writeFileSync(path, lines.join("\n"));
    console.log("Stock updated.");
}

// TEST — uncomment to try
createCSV();
addProduct(101, "Soap", 30, 8);
addProduct(102, "Oil", 150, 12);
addProduct(103, "Paste", 50, 5);
console.log(getLowStockItems());
updateStock(103, 15);

module.exports = { createCSV, addProduct, getLowStockItems, updateStock };
