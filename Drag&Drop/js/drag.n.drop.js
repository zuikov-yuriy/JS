window.onload  =  function(){

document.onmousemove = function(event){	
		var y = event.clientY;
		var x = event.clientX;
		position.innerHTML = "x: " + x + " y: " +  y;
}


		var field = document.getElementById("field");
		var w = field.offsetWidth;
		var h = field.offsetHeight;
		var div_w = '50';
		var div_h = '50';
		var l =  w/2 - div_w/2;
		var t =  h/2 - div_h/2;
		var i = 0;
		move = false;
		div = null;

		
function add() {
		var div = document.createElement("div");
		div.innerHTML = "y: " + t + "<br> x: " +  l ;
		div.style.cursor = 'pointer';
		div.id = i;
		div.style.zIndex = 0;
		div.style.position = 'absolute';
		div.style.top = t+'px';
		div.style.left = l+'px';
		div.style.height = div_h;
		div.style.width = div_w;
		div.style.backgroundColor = '#CCC';		
		div.style.border = '1px solid blue';
		div.style.color = 'red';

		field.appendChild(div);
		div.addEventListener('mousedown', clickDown, false);
		div.addEventListener('mouseup', clikUp, false);
		i++;
		document.getElementById("count").innerHTML =" "+i;


		var resize = document.createElement("div");
		resize.style.height = '15px';
		resize.style.width = '15px';
		resize.style.styleFloat = 'right';
		resize.style.backgroundColor = 'black';
		resize.style.zIndex = 2;
		div.appendChild(resize);
		resize.addEventListener('mousedown', resizeDown, true);
}



resizeDown  = function(event){

		var y = event.clientY;
		var x = event.clientX;

        var parent = this.parentNode;
		parent.style.height = y;
		parent.style.width = x;
}


document.getElementById("field").ondblclick= function (){
		add();
}

document.getElementById("but").onmousedown  = function (){
		add();
}




 function zindex(){
		for(x=0;x<=i;x++){
		  if (x == div.id) 
		   {div.style.zIndex = 2;} 
		  else
  		   {document.getElementById(x).style.zIndex = 0; }
		} 
         
   }




clickDown  = function(event){
		window.move = true;
		window.div = this;
		window.select = this;
		div.style.border = '1px solid orange';
		div.style.opacity = 0.5;
		zindex();
}
	

clikUp  = function(event){
       window.move = false;
	   div.style.border = '1px solid blue';
	   div.style.opacity = 10;
}
	
document.onmouseup = function(event) {
      window.move = false;
	  div.style.border = '1px solid blue';
	  div.style.opacity = 10;
}


field.onmousemove = function(event) {

		var y = event.clientY;
		var x = event.clientX;

		var boxT = y - field.offsetTop - 25;
		var boxL = x -  field.offsetLeft - 25;

		var boxB = h - div_h - 4;
		var boxR = w - div_w - 4;

		if (boxT < 0) {boxT = 0; }
		if (boxT > boxB) {boxT = boxB;}


		if (boxL < 0) {boxL = 0;}
		if (boxL > boxR) {boxL = boxR;}
	
	if(move){
		div.style.top = boxT;
		div.style.left = boxL;
		div.innerHTML = "y: " + boxT + "<br> x: " +  boxL ;
	}  

}

   
   
}


