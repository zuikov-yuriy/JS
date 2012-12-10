window.onload  =  function(){

var field = document.getElementById("field");

//Пишем координаты курсора---------------------------------------------------------------------------------------
var Position = function(){
		this.y = 0;
		this.x = 0;
	}	
	Position.prototype.get = function(e){
		this.y = e.clientY;
		this.x = e.clientX;
	}   	
	Position.prototype.write = function(){
		document.getElementById("position").innerHTML = "x: " + this.x + " y: " +  this.y;
}

	var p = new Position();
	document.onmousemove = function(event){	 
		p.get(event);
		p.write();
	}
//------------------------------------- -----------------------------------------------------------------------------------
	
	
//Размер поля -----------------------------------------------------------------------------------
var Field = function(el) {
		this.w = 0;
		this.h = 0;
		this.el = el;
		this.top = 0;
		this.left = 0;
		this.x = 0;
		this.y = 0;
	}
	
	Field.prototype.size = function(){
		this.w = this.el.offsetWidth;
		this.h = this.el.offsetHeight;
		this.center();
	}
	
	Field.prototype.mouse_position = function(e){
	    this.x = e.clientX -  this.el.offsetLeft - 1;
		this.y = e.clientY - this.el.offsetTop - 1;
		this.write();
	}
	
	Field.prototype.center = function(){
	    this.top = this.h/2;
	    this.left = this.w/2;
    }
	
	Field.prototype.write = function(){
		document.getElementById("test").innerHTML = "x: " + this.x + " y: " + this.y;
}
	
	
	
	var f = new Field(field);
	f.size();

//------------------------------------------------------------------------------------------------------------------------------	

	
	
//Создаем элемент-----------------------------------------------------------------------------------------------------------
var Element = function(tag, h, w){
		this.tag = tag;
		this.h = h;
		this.w = w;
		this.el = null;
		this.resize = ["l-t", "l-b", "r-t", "r-b"];
	}
	
	Element.prototype.style = function(){
		this.el = document.createElement(this.tag);
		this.el.style.height = this.h;
		this.el.style.width = this.w;
		this.el.style.top = f.top - (this.h/2) + 'px';
		this.el.style.left = f.left - (this.w/2) +'px';
		this.el.addEventListener('mousedown', clickDown, false); 
		this.el.addEventListener('mouseup', clickUp, false);
		for(var i=0; i<this.resize.length; i++) {
			var div = document.createElement("div");
			div.id = this.resize[i];	
			div.addEventListener('mousedown', resizeDown, false);
			div.addEventListener('mouseup', resizeUp, false);
			this.el.appendChild(div);
		}	
	}
	Element.prototype.insert = function(){
	    this.style();
		field.appendChild(this.el);
}

	field.ondblclick= function (){
		var div = new Element("div", 50, 50);
		div.insert();
	}
//----------------------------------------------------------------------------------------------------------------------------	



//Двигаем элемент------------------------------------------------------------------------------------------------
var Move = function(){
		this.el = null;
		this.drive = false;
	}
	Move.prototype.element = function(el, drive){
	   this.el = el;
	   if (drive) {this.drive = true;} else {this.drive = false;}
	}
	
	Move.prototype.go = function(){
	     var top = f.y - 25;
		 var left = f.x - 25;
		     if (top < 0) {top = 0; }
             if (left < 0) {left = 0; }
             if (top > f.h - 50 - 4) {top = f.h - 50  -  4;}
	         if (left > f.w - 50 - 4) {left = f.w - 50  - 4;}
	
	   if (this.drive){
	    this.el.style.top = top;
		this.el.style.left = left;
	   }
	   
	}
	
    var move = new Move();

//----------------------------------------------------------------------------------------------------------------------------

	
	
 
clickDown  = function(){
	move.element(this, true);
}
	
clickUp  = function(){
	move.element(this, false);
}

field.onmousemove = function(event) {
	 f.mouse_position(event);
	 move.go();
}





//РАЗМЕР-------------------------------------------------------------

var Resize = function(){
		this.el = null;
		this.size = false;
		this.i = 50;
	}
	
	Resize.prototype.move = function(el, size){
		this.el = el;
		if (size) {this.size = true;} else {this.size = false;}
	}

	Resize.prototype.go = function(){
		if (this.size){
			this.i ++;
			var parent = this.el.parentNode;
			parent.style.height = this.i;
			parent.style.width = this.i;
		}
	}
	
    var resize = new Resize();
	
	
resizeDown  = function(event){
    resize.move(this, true);
    event.stopPropagation();
}
	
	
resizeUp  = function(event){
	resize.move(this, false);
    event.stopPropagation();
}


onmousemove = function(event) {
	resize.go();
	event.stopPropagation();
}


}


