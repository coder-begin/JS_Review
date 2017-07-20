var Game2048 = {
	cellArr: [],
	touchBeginX: 0,
	touchBeginY: 0,
	touchEndX: 0,
	touchEndY: 0,
	cellLocal: [],
	cellNum: [0, 2, 4, 8],
	gameOverFlag: false,
	cellColor: ["yellow", "green", "blue", "red"],
	Cell: function(num, color, localArr) {
		this.num = num;
		this.color = color;
		this.local = localArr;
	},
	createOneCell: function () {
		var newCell=this.getRandomCell();
		var oDiv = document.querySelectorAll(".row>div");
		var cellLocal=newCell.local[0] * 4 + newCell.local[1];
		oDiv[cellLocal].innerHTML="<div class='cellBegin' style='background-color: "+newCell.color+"'>"+newCell.num+"</div>";
	},
	renderCells: function( beginLocal , endLocal , dir) {
		var _this=this;
		var oDiv = document.querySelectorAll(".row>div");
		var begin=beginLocal[0]*4+beginLocal[1];
		var end=endLocal[0]*4+endLocal[1];
		switch (dir){
			case "left":
				break;
			case "right":
				var xMove=(Math.abs(endLocal[1]-beginLocal[1])*(100+7.22))+"%";
				oDiv[begin].childNodes[0].style.left=xMove;
				setTimeout(function () {
					oDiv[begin].innerHTML="";
					oDiv[end].innerHTML="";
					oDiv[end].innerHTML="<div  style='background-color: "+_this.cellArr[endLocal[0]][endLocal[1]].color+"'>"+_this.cellArr[endLocal[0]][endLocal[1]].num+"</div>"
				},800);
				break;
			case "up":
				break;
			case "down":
				break;
		}

	},
	moveLeft: function () {

	},
	moveRight: function (beginLocal) {
		var cellArr=this.cellArr;
		var i=beginLocal[0];
		var beginY=beginLocal[1];
			for(var j = cellArr[i].length-1 ; j > beginY  ; j--){
						if( cellArr[i][j] == 0 ){
							if( !tools.hasBlock(beginLocal,[i,j],"right",this.cellArr)){
								cellArr[i][j]=cellArr[i][beginY];
								cellArr[i][beginY]=0;
								this.renderCells(beginLocal,[i,j],"right");
							}
							break;
						}else if(cellArr[i][beginY].num == cellArr[i][j].num){
							if( !tools.hasBlock(beginLocal,[i,j],"right",this.cellArr)){
								cellArr[i][j]=cellArr[i][beginY];
								cellArr[i][j].num+=cellArr[i][beginY].num;
								cellArr[i][beginY]=0;
								this.renderCells(beginLocal,[i,j],"right");
							}
							break;
						}
			}

	},
	moveUp: function () {

	},
	moveDown: function () {

	},
	move: function(dir, cellArr) {
		switch(dir) {
			case "right":
				for(var i = 0 ; i < cellArr.length ;i++){
					for(var j = cellArr[i].length-2 ; j > -1;j--){
						if(cellArr[i][j] instanceof  this.Cell){
							if(tools.canMove(cellArr,dir,[i,j])){
								this.moveRight([i,j]);
							}
						}

					}
				}
				break;
			case "left":

				break;
			case "up":

				break;
			case "down":

				break;
			default:
				break;
		}
	},
	changeScore: function() {
		var score = 0;
		var oSpan = document.getElementById("score");
		for(var i = 0; i < this.cellArr.length; i++) {
			for(var j = 0; j < this.cellArr[i].length; j++) {
				if(this.cellArr[i][j] instanceof this.Cell) {
					score += this.cellArr[i][j].num;
				}
			}
		}
		oSpan.textContent = score;
	},
	updateBoard: function() {
		var _this = Game2048;
		var xDir = Math.round(_this.touchEndX - _this.touchBeginX);
		var yDir = Math.round(_this.touchEndY - _this.touchBeginY);
		if(_this.gameOverFlag) {
			if(Math.abs(xDir) > Math.abs(yDir)) {
				//向水平方向滑动
				if(xDir > 0) {
					//向右滑动


				} else {
					//向左滑动

				}
			} else {
				//向垂直方向滑动
				if(yDir > 0) {
					//向下滑动

				} else {
					//向上滑动

				}
			}
		} else {
			alert("GameOver!!");
		}
	},
	getRandomCell: function() {
		this.cellLocal = [];
		var cellArr = this.cellArr;
		for(var i = cellArr.length - 1; i > -1; i--) {
			for(var j = cellArr[i].length - 1; j > -1; j--) {
				if(cellArr[i][j] == 0) {
					this.cellLocal.push([i, j]);
				}
			}
		}
		if(this.cellLocal.length == 0){
			this.gameOverFlag=false;
			alert("GameOver!!");
		}
		var randomLocal = tools.getRandomNum(0, this.cellLocal.length - 1);
		var randomNum = tools.getRandomNum(0, this.cellNum.length - 1);
		var randomColor = tools.getRandomNum(0, this.cellColor.length - 1);
		var num = this.cellNum[randomNum];
		var color = this.cellColor[randomColor];
		var localArr = this.cellLocal[randomLocal];
		var cell = new this.Cell(num, color, localArr);
		this.cellArr[localArr[0]][localArr[1]] = cell;
		return cell;
	},
	initGame: function () {
		var allDiv=document.querySelectorAll(".row>div");
		for(var i=0;i<allDiv.length;i++){
			allDiv[i].innerHTML="";
		}
		this.initData();
		this.createOneCell();
		this.changeScore();
	},
	initSreen: function() {
		var container = document.getElementsByClassName("container")[0];
		var cell = document.querySelectorAll(".row>div");
		var cellHeight = cell[0].clientWidth + "px";
		for(var i = cell.length - 1; i > -1; i--) {
			cell[i].style.height = cellHeight;
			cell[i].style.lineHeight = cellHeight;
		}
		container.style.height = window.innerHeight + "px";
	},
	initEvent: function() {
		var _this = this;
		var btnGegin = document.getElementsByClassName("btn_begin")[0];
		window.ontouchstart = function(ev) {
			var touches = ev.touches;
			if(touches.length == 1) {
				_this.touchBeginX = touches[0].clientX;
				_this.touchBeginY = touches[0].clientY;
			}

		};

		window.ontouchmove = function(ev) {
			var touches = ev.touches;
			if(touches.length == 1) {
				_this.touchEndX = touches[0].clientX;
				_this.touchEndY = touches[0].clientY;
			}

		};
		window.ontouchend = this.updateBoard;
		btnGegin.onclick = function() {
			_this.gameOverFlag = true;
			if(_this.gameOverFlag) {
				_this.initGame();
			}

		};
		document.onkeydown = function(ev) {
			if(_this.gameOverFlag) {
				switch(ev.keyCode) {
					case 38:
						//上

						break;
					case 40:
						//下

						break;
					case 37:
						//左
						_this.move(_this.cellArr,"left");
						break;
					case 39:
						//右
						_this.move("right",_this.cellArr);
						_this.createOneCell();
						break;
				}
			} else {
				alert("GameOver!!");
			}

		}
	},
	initData: function() {
		for(var i = 3; i > -1; i--) {
			this.cellArr[i] = [];
			for(var j = 3; j > -1; j--) {
				this.cellArr[i][j] = 0;
			}
		}

	},
	init: function() {
		this.initData();
		this.initSreen();
		this.initEvent();
	}
}
Game2048.init();