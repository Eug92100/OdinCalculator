const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
var displayed = "";
var i = 0;
var nbs = [""];
var operators = [];


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
    if(operator == "+"){
        return add(nb1,nb2);
    } else if (operator == "-"){
        return substract(nb1,nb2);
    } else if (operator == "x"){
        return multiply(nb1,nb2);
    } else if (operator == "/"){
        return divide(nb1, nb2);
    } else {
        return "ERROR"
    }
}


buttons.forEach((button) => {
	button.addEventListener("click", function(e){
	if(nbs == [""]){
		displayed="";
	}
	if(e.target.value!== "clear" && e.target.value!== "equals"){
		displayed += e.target.value;
		var str = e.target.value;//storing the string so i can use the function charCodeAt
		if(str.charCodeAt(0)>47 && str.charCodeAt(0)<58){
			nbs[i] += e.target.value;	//creating a string that's going to be the input number
		} else {
			operators[i]="";
			operators[i] += e.target.value;
			++i; //so next time a number is clicked on a new string is created and stored in the array nbs
			nbs[i] = "";	
		}

			
	}else{
		if(e.target.value == "equals"){
			while(i>=0){
				nbs[i]= parseInt(nbs[i]);
				i--;
			}
			displayed = operate(nbs[0],operators[0],nbs[1]);
		} else {	
			displayed = "";
		}
		nbs = [""];
		operators = [];
		i = 0;
	}
	console.log(operators);
	screen.textContent = displayed;
		
		
	});
});