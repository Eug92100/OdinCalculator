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


//in case I want to add the power and factorial to my calculator
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


function operate(nb1, operator, nb2){
    if(operator == "+"){
        return add(nb1,nb2);
    } else if (operator == "-"){
        return substract(nb1,nb2);
    } else if (operator == "*"){
        return multiply(nb1,nb2);
    } else if (operator == "/"){
		if(nb2 == 0){
			return "CAN'T DIVIDE BY 0"
		}else{
			return divide(nb1, nb2);
		}
    } else {
        return "ERROR";
    }
}


function operationRules(nums, operators){
	//making the function works with negative numbers
	var minusIndex = operators.indexOf("-");
	console.log(nums[minusIndex]);
	if(minusIndex!== -1 && isNaN(nums[minusIndex])) {
		console.log(nums);
		nums[minusIndex+1] = Number("-"+nums[minusIndex+1]);
		nums.splice(minusIndex,1);
		operators.splice(minusIndex,1);
		console.log(operators);
	}
	//making sure that divisions and multiplications are done first
	var timesIndex = operators.indexOf("*");
	var divIndex = operators.indexOf("/");
	while (timesIndex!==-1 || divIndex!==-1){
		if(timesIndex > divIndex){
			var index = timesIndex;
			var ope = "*";
		}else {
			var index = divIndex;
			var ope = "/"
		}
		nums.splice(index, 2, operate(nums[index],ope,nums[index+1]));
		operators.splice(index, 1);
		divIndex = operators.indexOf("/");
		timesIndex = operators.indexOf("*");
	}
	// then it goes from left to right
	while (operators.length > 0){
		nums.splice(0, 2, operate(nums[0],operators[0],nums[1]));
		operators.splice(0, 1);
	}
	return nums
}

// in case of parenthesis, calculate first what inside
function parenthesis(nums, operators){
	var parIndex = [operators.indexOf("("),operators.indexOf(")")];
	var i = 0;
	while (parIndex[0]!==-1 && parIndex[1]!==-1){
		var result = operationRules(nums.splice(parIndex[0]+1,parIndex[1]-parIndex[0]),operators.splice(parIndex[0]+1,parIndex[1]-parIndex[0]-1));
		nums.splice(parIndex[0], 2, result[0]);
		operators.splice(parIndex[0],2);
		console.log(operators);
		parIndex = [operators.indexOf("("),operators.indexOf(")")];
		i++;
		
	} 
		return operationRules(nums,operators);
}



function buttonClick(target){
	if(target.value!== "clear" && target.value!== "equals"){
		//get rid of the displayed past result
		if(nbs ==  0 && operators.length == 0){
			displayed = target.textContent;
		} else {
		displayed += target.textContent;}

		//storing the string so i can use the function charCodeAt
		var str = target.value;

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
			
			displayed = parenthesis(nbs, operators);
			displayed = Number.parseFloat(displayed).toPrecision(4);
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

window.addEventListener("keydown",function(e){
	const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
	console.log(button);
})
