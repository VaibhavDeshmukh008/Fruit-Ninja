var PLAY =1;
var END =0;
var gameState = PLAY;
var score = 0;

var fruit, fruitImg1, fruitImg2, fruitImg3, fruitImg4;
var alienAnim, alien;
var sword, swordImg, gameOverImg, gameOverSound, swordSound;
var fruitGrp, alienGrp;

//load animation, images and sounds
function preload(){
  fruitImg1 = loadImage("fruit1.png");
  fruitImg2 = loadImage("fruit2.png");
  fruitImg3 = loadImage("fruit3.png");
  fruitImg4 = loadImage("fruit4.png");
  
  swordImg = loadImage("sword.png");
  
  gameOverImg = loadImage("gameover.png");
  
  alienAnim = loadAnimation("alien1.png","alien2.png");
  
 
}//end of function preload

function setup(){
  //create the canvas
  createCanvas(600,600);
  
  sword = createSprite(200,200,10,100);
  sword.addImage(swordImg);
  sword.scale = 0.7;
  
  fruitGrp = new Group();
  alienGrp = new Group();
}//end of function setup

function draw(){
  background("cyan");
  textSize(20);
  text("Score : "+score, 400,50);
  
  if(gameState== PLAY){
    //Move sword with mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    fruits();
    monsters();
    
    if(fruitGrp.isTouching(sword)){
      fruitGrp.destroyEach();
      score = score+1;
    }
    
    if(alienGrp.isTouching(sword)){
      gameState = END;
      
    }
  }
  if(gameState == END){
    
    alienGrp.destroyEach();
    fruitGrp.destroyEach();
    
    alienGrp.setVelocityXEach(0);
    fruitGrp.setVelocityXEach(0);
    
    sword.addImage(gameOverImg);
    sword.x = 300;
    sword.y = 200;
    sword.velocityX = 0;
    sword.velociyY = 0;
    
  }
  
  drawSprites();

}//end of function draw

function fruits(){
  if(frameCount%80 == 0){
    var position=Math.round(random(1,2))
    var i = Math.round(random(50,400));
    fruit = createSprite(600,i,20,20);
    
    //add various fruit images
    var n = Math.round(random(1,4));
    switch (n){
      case 1: fruit.addImage(fruitImg1);
              break;
      case 2: fruit.addImage(fruitImg2);
              break;
      case 3: fruit.addImage(fruitImg3);
              break;
      case 4: fruit.addImage(fruitImg4);
              break;
      default: break;
    }
    
    if(position==1){
      fruit.x=0;
      fruit.velocityX = (32+(score/10));
    
    }
    else if(position==2){
      fruit.x=600;
      fruit.velocityX = -(32+(score/10));
    }
    fruit.scale = 0.2;
     
    fruit.lifetime = 100;
    fruitGrp.add(fruit);
  }
  
  
  
}//end of function fruits

function monsters(){
  if(frameCount%200 === 0){
    var i = Math.round(random(50,400));
    alien = createSprite(600,i,20,20);
    alien.addAnimation("aliens",alienAnim);
    alien.velocityX = -(32+(score/10));
    alien.lifetime = 70;
    alienGrp.add(alien);
  }
  
}//end of function monsters