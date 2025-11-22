// 1. Get container
const container = document.getElementById("calculatorContainer");

// 2. Create display
const display = document.createElement("input");
display.setAttribute("type", "text");
display.setAttribute("id", "display");
display.setAttribute("readonly", true);
container.appendChild(display);

// 3. Button layout (rows)
const buttonValues = [
    ['7','8','9','/','log10'],
    ['4','5','6','*','^'],
    ['1','2','3','-','C'],
    ['0','.','=','+','']
];

// 4. Buttons container
const buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons-container");
container.appendChild(buttonsContainer);

// 5. Create buttons dynamically
buttonValues.flat().forEach(val => {
    if(val === '') return; // skip empty spaces
    const btn = document.createElement("button");
    btn.textContent = val;
    buttonsContainer.appendChild(btn);

    // Event handling
    btn.addEventListener("click", () => {
        if(val === "C") {
            display.value = "";
        } else if(val === "=") {
            try {
                let expr = display.value.replace(/log10/g, "Math.log10");
                display.value = eval(expr);
            } catch {
                display.value = "Error";
            }
        } else if(val === "^") {
            display.value += "**"; // JS power operator
        } else {
            display.value += val;
        }
    });
});
