const fs = require("fs");
const path = "./data/EmpLogin.txt";

/**
 * Add a daily employee login detail
 * @param {*} empID 
 * @param {*} date (YYYY-MM-DD)
 * @param {*} timeIn (HH:MM)
 * @param {*} timeOut (HH:MM)
 */
function addLogin(empID, date, timeIn, timeOut) {
    const record = {
        EmpID: empID,
        Date: date,
        TimeIn: timeIn,
        TimeOut: timeOut
    };

    fs.appendFileSync(path, JSON.stringify(record) + "\n", "utf-8");
    console.log("Employee login added.");
}

/**
 * Counts employees logged after 10 AM on given date
 * @param {*} dateString 
 */
function countLateEmployees(dateString) {
    if (!fs.existsSync(path)) {
        console.log("No login file found.");
        return;
    }

    const data = fs.readFileSync(path, "utf-8").trim().split("\n");
    let count = 0;

    data.forEach(line => {
        const obj = JSON.parse(line);
        if (obj.Date === dateString) {
            let hour = parseInt(obj.TimeIn.split(":")[0]);
            if (hour >= 10) count++;
        }
    });

    console.log(`Employees logged after 10AM on ${dateString}: ${count}`);
}

// TEST — uncomment to try
addLogin("EMP01", "2025-11-03", "09:50", "18:00");
addLogin("EMP02", "2025-11-03", "10:15", "17:30");
countLateEmployees("2025-11-03");

module.exports = { addLogin, countLateEmployees };
