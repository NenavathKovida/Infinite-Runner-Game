var PLAY=1;
var END=0;
var gameState=PLAY;
var ground;
var player,player_running;
var banana,bananaImage,obstacle,obstacleImage;
var bananaGroup,obstacleGroup;
var back;
var score=0;

function preload(){
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
backImage=loadImage("jungle.jpg");
}

function setup(){
canvas=createCanvas(displayWidth-20,displayHeight-30);

player=createSprite(130,354,100,10);
player.addAnimation("moving",player_running);
player.scale=0.1;

back=createSprite(0,110,0,10);
back.addImage(backImage);
back.velocityX=-4;
back.x=back.width/2;
console.log(back.x);

ground = createSprite(129,354,900,10);
ground.visible=false;
  
bananaGroup=createGroup();
obstacleGroup=createGroup();
}

function draw() {
    background(0);
    
    if(gameState===PLAY)
      if (back.x<0){
        back.x = back.width/2;
      }
     if(keyDown("space")&& player.y >= 100) {
         player.velocityY = -12;
      }
     if(player.isTouching(bananaGroup)){
       bananaGroup.destroyEach();
       score=score+2;
       player.scale=player.scale+0.1;
     }
     player.velocityY = player.velocityY + 0.8;
     player.collide(ground);
     
      
     player.depth = back.depth;
     player.depth = back.depth + 1;
     
      spawnBananas();
      spawnObstacles();
    
  
     if(player.isTouching(obstacleGroup)){
       obstacleGroup.destroyEach();
       score=score-1;
       player.scale=player.scale-0.1;
     }
    
    drawSprites();
    stroke("white");
    textSize(15);
    fill("white");
    text("SCORE:"+score,400,60);
}

function spawnBananas(){
    if(frameCount%80===0){
      var banana=createSprite(600,165,10,40);
      banana.velocityX=-3;
      banana.y = Math.round(random(120,200));
      banana.addImage(bananaImage);
      banana.scale=0.1;
      banana.lifetime=200;
      
      bananaGroup.add(banana);
    }
  }
  function spawnObstacles(){
    if(frameCount%100===0){
      var obstacle=createSprite(600,324,10,40);
      obstacle.velocityX=-5;
      
      switch(score){
        case 10:player.scale=0.12;
            break;
        case 20:player.scale=0.14;
            break;
        case 30:player.scale=0.16;
            break;
        case 40:player.scale=0.18;
            break;
            default:break;
      }
        
        
      obstacle.addImage(obstacleImage);
      obstacle.scale=0.1;
      obstacle.lifetime=150;
      
      obstacleGroup.add(obstacle);
      }
  }
  
  
  
  
  
    