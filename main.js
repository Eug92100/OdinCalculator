const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
var displayed = "";


function add (a,b) {
	return a + b;
}

function subtract (a,b) {
	return a - b;
}

function sum (s) {
	if (s === []) {
		return 0;
	} else {
		total = 0;
		for (var i = 0; i < s.length; i++) {
			total += s[i];
		}
		return total;
	}
}

function multiply(a,b){
    return a*b;
}
// function multiply (m) {
// 	total = 1;
// 	for (var i = 0; i < m.length; i++) {
// 		total *= m[i];
// 	}
// 	return total
		
// }

function divide (a,b) {
    return a/b;
}

function power(a,b) {
	var total = 1;
	for(var i = 0; i < b; i++){
		total *= a;
	}
	return total;
}

function factorial(a) {
	var total = 1;
	while(a>0) {
		total *= a;
		a--;
	}
	return total;
}


function operate (nb1, operator, nb2){
    if(operator == "plus"){
        return add(nb1,nb2);
    } else if (operator == "minus"){
        return substract(nb1,nb2);
    } else if (operator == "times"){
        return multiply(nb1,nb2);
    } else if (operator == "divided"){
        return divide(nb1, nb2);
    } else {
        return "ERROR"
    }
}

buttons.forEach((button) => {
	button.addEventListener("click", function(e){
		displayed += e.target.value;
		screen.textContent = displayed;
	});
});