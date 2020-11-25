
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var gameState = "playing";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
   
}



function setup() {
  createCanvas(600, 600)
  monkey = createSprite(100, 400, 10, 10);
  monkey.addAnimation("monkeyRunning", monkey_running);
  monkey.scale = 0.1
  ground = createSprite(300, 450, 1000, 10);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);
  if(gameState === "playing"){
    
    score = score + 1;
    
    text("Survival Time: " + score, 500, 50)
    if(monkey.isTouching(obstacleGroup)){
      
      gameState = "end";
      
    }
    if(monkey.isTouching(foodGroup)){
      
      foodGroup.destroyEach();
      
    }
    if(keyDown("space") && monkey.y >= 414){
      
      monkey.velocityY = -12;
      
    }
  
    if(frameCount % 60 === 0){
    
      spawnObjects();
    
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;
  
    monkey.collide(ground);
    drawSprites();
  } else {
    
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    text("You Lost", 300, 300);
    
  }
}

function spawnObjects(){
  
  i = round(random(1, 2));
  if(i === 1){
    
    bananaHeight = random(250, 350);
    bananaPosition = random(650, 750);
    
    banana = createSprite(bananaPosition, bananaHeight, 10, 10);
    banana.velocityX = -5;
    banana.addImage("bananaImage", bananaImage);
    banana.scale = 0.1
    banana.lifetime = 300;
    foodGroup.add(banana);
    
  } else {
    
    obstacle = createSprite(700, 430, 10, 10);
    obstacle.velocityX = -5;
    obstacle.addImage("obstacleImage", obstacleImage);
    obstacle.scale = 0.1
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 300;
    
  }
  
}




