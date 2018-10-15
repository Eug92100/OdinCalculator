const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
var displayed = "";
var i = 0;
var nbs = [""];
var operators = [];


function add (a,b) {
	return a + b;
}

function substract (a,b) {
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

function parenthesis(nums, operators){
	var subNums =[""];
	var subOperators = [""];
	var parIndex = [operators.indexOf("("),operators.indexOf(")")];
	var i = 0;
	while (parIndex[0]!==-1 && parIndex[1]!==-1){
		subNums [i] = nums.splice(parIndex[0],parIndex[1]);
		//replace to keep the index right and keep in mind where the parenthesis were
		subOperators [i] = operators.splice(parIndex[0],parIndex[1]-parIndex[0]+1,",");
		parIndex = [operators.indexOf("("),operators.indexOf(")")];
		i++;
		console.log(subNums);
		console.log(subOperators);
	} 
		return [subNums,subOperators];
}



function buttonClick(target){
	if(target.value!== "clear" && target.value!== "equals"){
		//get rid of the displayed past result
		if(nbs ==  0 && operators.length == 0){
			displayed = target.value;
		} else {
		displayed += target.value;}
		var str = target.value;//storing the string so i can use the function charCodeAt

		//Storing the input value in one of the two arrays
		if(str.charCodeAt(0)>47 && str.charCodeAt(0)<58){
			nbs[i] += target.value;	
		} else {
			operators[i]="";
			operators[i] += target.value;
			++i; 
			nbs[i] = "";	
		}
			
	}else{
	//action for Clear and = buttons
		if(target.value == "equals"){
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
		i=0;
	}
	screen.textContent = displayed;
		
		
};



buttons.forEach((button) => {
	button.addEventListener("click", (e) => buttonClick(e.target) )});