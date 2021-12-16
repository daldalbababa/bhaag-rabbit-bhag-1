var carrot , carrotImage;
var rabbit , rabbitImage;
var redbird , redbirdImage;
var bird , birdImage;
var ob1 , ob2 ,ob3 , ob4 , ob5 , ob6 , ob7;
var bg , bgImage;

function preload(){
  carrotImage = loadImage("assets/goldencarrot.png");
  rabbitImage = loadAnimation("assets/r1.png" , "assets/r2.png" , "assets/r3.png" , "assets/r4.png" , "assets/r5.png" , "assets/r6.png");
  redbirdImage = loadAnimation("assets/rb1.png" , "assets/rb2.png" , "assets/rb3.png");
  birdImage = loadAnimation("assets/b1.png" , "assets/b2.png" , "assets/b3.png"  , "assets/b4.png");
  ob1 = loadImage("assets/ob1.png");
  ob2 = loadImage("assets/ob2.png");
  ob3 = loadImage("assets/ob3.png");
  ob4 = loadImage("assets/ob4.png");
  ob5 = loadImage("assets/ob5.png");
  ob6 = loadImage("assets/ob6.png");
  ob7 = loadImage("assets/ob7.png");
  bgImage = loadImage("assets/BG1.png");
}
function setup() {
  createCanvas(800,800);
  carrot = createSprite(400, 200, 50, 50);
  carrot.addImage(carrotImage);
  carrot.scale= 0.15;
  rabbit = createSprite(200 , 200);
  rabbit.addAnimation("running" , rabbitImage);
  rabbit.scale=1.2;
  redbird = createSprite(400 ,400) ; 
  redbird.addAnimation("flying" , redbirdImage);
  bird = createSprite(200 ,400) ; 
  bird.addAnimation("flying" , birdImage);
  carrotGroup = createGroup();
  birdGroup = createGroup();
}

function draw() {
  //rabbit.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && rabbit.y >= 159) {
      rabbit.velocityY = -12;
    }
  
    rabbit.velocityY = rabbit.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    rabbit.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(rabbit)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    rabbit.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the rabbit animation
    rabbit.changeAnimation("collided",rabbit_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = rabbit.depth;
    rabbit.depth = rabbit.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  rabbit.changeAnimation("running",rabbit_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}