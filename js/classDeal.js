function addClass(className, elem) {
	elem.className += " " + className;
	
}

function removeClass(className, elem) {
	var classes = elem.className;
	var reg = new RegExp(className, "ig");
	elem.className = classes.replace(reg, "");
}
var $={
	addClass:addClass,
	removeClass:removeClass
}
