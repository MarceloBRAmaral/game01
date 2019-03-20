//canvas definition
var document;var window;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//get canvas dimensions
var canvasWid = canvas.width;
var canvasHig = canvas.height;
//font size and color
ctx.font = '20px Arial';
//define scene speed
var speed = 4;
//player/enemy properties
var player = {color:'green', energy:1, type:'player'};
var enemy = {color:'red', energy:1, type:'enemy'};
//box object constructor
function Box(box) {
    this.xDirect = 1;//initial directions
    this.yDirect = 1;
    this.xpos = Math.floor((Math.random() * (canvasWid-50)) + 1);
    this.ypos = Math.floor((Math.random() * (canvasHig-50)) + 1);
    this.testDirection = function () {
        if (this.xpos<0 || this.xpos>canvasWid-50) {
            this.xDirect*=-1;
        }
        if (this.ypos<0 || this.ypos>canvasHig-50) {
            this.yDirect*=-1;
        }
    }; 
    this.position = function () {//defines the box position
        if (box.type == 'enemy') {//enemy moves by itself
            this.xpos+=speed*box.energy*this.xDirect; this.ypos+=speed*box.energy*this.yDirect;   
            ctx.fillStyle = box.color;
            ctx.fillText(box.type + ' xpos = ' + this.xpos,50,50);
        }else if (box.type == 'player') {//player is controlled by mouse
            document.onmousemove = function(mouse) {
            player.xpos = mouse.clientX-25;
            player.ypos = mouse.clientY-25;
            //to not get player off canvas
            if(player.xpos>canvasWid-50){player.xpos=canvasWid-50;
            }else if(player.xpos<0){player.xpos=0;}
            if(player.ypos>canvasHig-50){player.ypos=canvasHig-50;
            }else if(player.ypos<0){player.ypos=0;}
            };
            //to not get over enemy
            if((enemy.ypos-player.ypos)<50&&(enemy.ypos-player.ypos)>2&&(enemy.xpos-player.xpos)<50&&(enemy.xpos-player.xpos)>-50){player.ypos=enemy.ypos-50;}//from above
            if((player.ypos-enemy.ypos)<50&&(player.ypos-enemy.ypos)>2&&(enemy.xpos-player.xpos)<50&&(enemy.xpos-player.xpos)>-50){player.ypos=enemy.ypos+50;}//from below
            if((enemy.xpos-player.xpos)<50&&(enemy.xpos-player.xpos)>2&&(enemy.ypos-player.ypos)<50&&(enemy.ypos-player.ypos)>-50){player.xpos=enemy.xpos-50;}//from right
            if((player.xpos-enemy.xpos)<50&&(player.xpos-enemy.xpos)>2&&(enemy.ypos-player.ypos)<50&&(enemy.ypos-player.ypos)>-50){player.xpos=enemy.xpos+50;}//from left
            
            
            ctx.fillStyle = box.color;
            ctx.fillText(box.type + ' xpos = ' + this.xpos,50,90);
        }};
    this.print = function () {
        ctx.fillStyle = box.color;//defines the box color
        ctx.fillRect (this.xpos,this.ypos,50,50);//draw the box
    };
}
//collision functions
function collisionFromBelow(box1,box2) {
    var vx = box1.xpos - box2.xpos;
    var vy = box1.ypos - box2.ypos;
    return(vx>-50&&vx<50&&vy>-55&&vy<0);
}
function collisionFromUp(box1,box2) {
    var vx = box1.xpos - box2.xpos;
    var vy = box1.ypos - box2.ypos;
    return(vx>-50&&vx<50&&vy>0&&vy<55);
}
function collisionFromLeft(box1,box2) {
    var vx = box1.xpos - box2.xpos;
    var vy = box1.ypos - box2.ypos;
    return(vx>0&&vx<55&&vy>-50&&vy<50);

}
function collisionFromRight(box1,box2) {
    var vx = box1.xpos - box2.xpos;
    var vy = box1.ypos - box2.ypos;
    return(vx>-55&&vx<0&&vy>-50&&vy<50);

}

//create two boxes
player = new Box(player);
enemy = new Box(enemy);

//clears the canvas function
var clearCanvas = function () {
    ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvasWid,canvasHig);
};
//main loop
function main() {
    var init; //var window;
    init = window.requestAnimationFrame(main);
  
  // Whatever your main loop needs to do.
    
    clearCanvas();
    player.testDirection();
    player.position();
    player.print();//print the 1st box
    enemy.testDirection();
    enemy.position();
    enemy.print();//print the 2nd box
    //test collisions
    var isCollindingFromBelow = collisionFromBelow(player,enemy);
    if(isCollindingFromBelow) {enemy.yDirect=1;}
    var isCollindingFromUp = collisionFromUp(player,enemy);
    if(isCollindingFromUp) {enemy.yDirect=-1;}
    var isCollindingFromLeft = collisionFromLeft(player,enemy);
    if(isCollindingFromLeft) {enemy.xDirect=-1;}
    var isCollindingFromRight = collisionFromRight(player,enemy);
    if(isCollindingFromRight) {enemy.xDirect=1;}
}

function startLoop(){
    
    main();
}

startLoop();