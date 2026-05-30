"use strict"

window.addEventListener('resize', () => {
    if(window.innerWidth > 863) {
        document.getElementById('tab-1').style.display = '';
        document.getElementById('tab-2').style.display = '';
    } else {
        document.getElementById('tab-1').style.display = 'flex';
        document.getElementById('tab-2').style.display = 'none';
        
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(el => {
            el.classList.remove('active');
            el.style.color = el.dataset.originalColor;
        });
        document.querySelector('[data-tab="tab-1"]').classList.add('active');
        document.querySelector('[data-tab="tab-1"]').style.color = '#f3701e';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    tabs();
})

let btnInput = document.querySelectorAll(".btn");
let input = document.getElementById("input");
let output = document.getElementById("output");
let equalBtn = document.getElementById("equal");
let cancelBtn = document.getElementById("cancel");
let deleteBtn = document.getElementById("delete");
let history = document.getElementById("tab-2");

window.onload = () => {
    input.value = "";
    output.value = "";
}

let equalPrssd = 0;

btnInput.forEach((buttonClass) => {
    buttonClass.addEventListener("click", (e) => {
        let value = e.target.dataset.number;

        if(value === "DEL") {
            equalPrssd = 0;
            input.value = input.value.slice(0, -1);
            return;
        }

        if(value === "C") {
            input.value = "";
            output.value = "";
            return;
        }

        if(value === "=") {
            equalPrssd = 1;
            let inputValue = input.value;

            if(/^[0-9+\-*/.()%^√∛sincostanPI ]+$/.test(inputValue)) {
                try{
                    let expression = inputValue
                    .replaceAll("sin", "Math.sin")
                    .replaceAll("cos", "Math.cos")
                    .replaceAll("tan", "Math.tan")
                    .replaceAll("^2", "**2")
                    .replaceAll("√", "Math.sqrt")
                    .replaceAll("∛", "Math.cbrt")
                    .replace(/(\d+\.?\d*)\s*([-+])\s*(\d+\.?\d*)%/g, (_, a, operator, b) => {
                      if(operator === '-') return `${a} - ${a} * ${b} / 100`;
                      if(operator === '+') return `${a} + ${a} * ${b} / 100`;
                    });

                    let result = eval(expression);
                    if(Number.isNaN(result) || !Number.isFinite(result)) {
                        throw new Error("Invalid Expression")
                    }

                    result = Number.isInteger(result) ? result : result.toFixed(6);
                    output.textContent = result;

                    historyOutput(expression, result);
                } catch(e) {
                    output.textContent = 'Error';
                }
            } else {
                output.textContent = 'Error';
            }
           
            return;
        }

        if(equalPrssd === 1) {
            equalPrssd = 0;    
        }

        input.value += value;
    })
})

input.addEventListener("keydown", (e) => {
    const allowed = '0123456789+-*/().%';
    if(!allowed.includes(e.key) && e.key !== "Backspace" && e.key !== "Enter") {
        e.preventDefault();
    }

    if(e.key === 'Enter') {
        equalBtn.click();
    }
})

function historyOutput(expression, result){
    let div = document.createElement("div");
    let p = document.createElement("p");
    let button = document.createElement("button");

    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.justifyContent = "flex-end";
    div.style.borderBottom = "1px solid #4b607f";
    div.style.padding = "10px 0 5px 0";

    
    button.className = "history-style";
    button.textContent = "Delete";
    
    p.textContent = `${expression} = ${result}`;
    p.style.margin = "0";
    p.style.flex = "1";
    p.style.marginRight = "10px";
    p.style.wordBreak = "break-all";

    button.addEventListener("click", () => {
        div.remove();
    })
    


    div.appendChild(p);
    div.appendChild(button);
    history.appendChild(div);

}