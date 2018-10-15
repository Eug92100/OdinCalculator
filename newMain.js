const screen = document.querySelector(".screen");
const buttons = Array.from(document.querySelectorAll("button"));
var displayed = "";
var operation  = "";

function buttonClick(target){
	if(target.value!== "clear" && target.value!== "equals"){
		//get rid of the displayed past result
		if(operation == ""){
            operation = target.value;
            displayed = target.textContent;
		} else {
            operation += target.value;
            displayed += target.textContent;}
		
			
	}else{
	//action for Clear and = buttons
		if(target.value == "equals"){
            displayed = eval(operation);
            operation = "";
		} else {	
			displayed = " ";
		}
	}
	screen.textContent = displayed;
		
		
};



buttons.forEach((button) => {
	button.addEventListener("click", (e) => buttonClick(e.target) )});