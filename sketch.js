//cars group = yellow car
//cars group 1 = lamborghini
//cars group 2 = green
//cars group 3 = red car
//buses group1  = yellow bus
var backgrounImage, bg ;
var inv1,inv2,inv3,inv4;
var gameState;
var START;
var PLAY;
var END;
function preload(){
  backgroundImage = loadImage("bg.jpg");
  gameoverImage = loadImage("Gameover.png");
  clickImage = loadImage("click.png");
  thief_running = loadAnimation("thief1.png","thief2.png","thief3.png");
  thief_right = loadAnimation("thief6.png");
  thief_left = loadAnimation("thief9.png");
  
  carImage = loadImage("car1.png");
  carImage1 = loadImage("car2.png");
  carImage2 = loadImage("car3.png");
  carImage3 = loadImage("car4.png");
  carImage4 = loadImage("car5.png");
  
  busImage = loadImage("bus1.png");
  
  lamborghiniSound = loadSound("Lamborghini.mp3");
  carSound = loadSound("CarAlarm.mp3");
}

function setup() {
  createCanvas(600, 500);
  //bg = createSprite(300,300);
  //bg.addImage("bg",backgroundImage);
  //bg.velocityY = 2.5;
  
  thief = createSprite(300,400);
  thief.addAnimation("thief",thief_running);
  thief.scale = 3.5;
  
  gameover = createSprite(300,250);
  gameover.addAnimation("gameover",gameoverImage);
  gameover.scale = 0.5;
  
  click = createSprite(300,400);
  click.addAnimation("click",clickImage);
  click.scale = 0.5;
  click.visible = false;
  
  carsGroup = new Group();
  carsGroup1 = new Group();
  carsGroup2 = new Group();
  carsGroup3 = new Group();
  carsGroup4 = new Group();
  busesGroup1 = new Group();
  
  thief.setCollider("circle",0,0,15);
  thief.debug = false;
  
  score = 50;
}

function draw() {
  background(0);
  //start();
  //if(mousePressedOver(click)) {
    //play();
  //}
  if(gameState === PLAY) {
    carSound.play();
    background(0);
    if(frameCount % 10 === 0) {
       bg = createSprite(300,300);
       bg.addImage("bg",backgroundImage);
       bg.velocityY = 5;
       bg.scale = 2.5
       thief.depth = bg.depth;
       thief.depth = thief.depth + 1;
       carsGroup.depth = bg.depth;
       carsGroup.depth = carsGroup.depth + 1;
    }
    thief.visible = true;
    gameover.visible = false;
    if(frameCount % 60 === 0) {               //yellow car
      var car = createSprite(50,10);
      car.addImage("car",carImage);
      car.scale = 0.4;
      car.velocityY = 30;
      carsGroup.add(car);
    }
    if(frameCount % 180 === 0) {               //lamborghini
      var car1 = createSprite(400,10);
      car1.addImage("car1",carImage1);
      car1.scale = 0.4;
      car1.velocityY = 30;
      lamborghiniSound.play();
      carsGroup1.add(car1);
    }
    if(frameCount % 500 === 0) {               //green car
      var car2 = createSprite(450,10);
      car2.addImage("car2",carImage2);
      car2.scale = 0.15;
      car2.velocityY = 30;
      carsGroup2.add(car2);
    }
    if(frameCount % 500 === 0) {               //red car
      var car3 = createSprite(300,10);
      car3.addImage("car3",carImage3);
      car3.scale = 0.1;
      car3.velocityY = 30;
      carsGroup3.add(car3);
    }
    if(frameCount % 300 === 0) {               //green car 2
      var car4 = createSprite(150,10);
      car4.addImage("car4",carImage4);
      car4.scale = 0.1;
      car4.velocityY = 30;
      carsGroup4.add(car4);
    }
    if(frameCount % 800 === 0) {               //bus
      var bus1 = createSprite(500,10);
      bus1.addImage("bus1",busImage);
      bus1.scale = 0.4;
      bus1.velocityY = 30;
      busesGroup1.add(bus1);
    }   
    
    if(keyDown("RIGHT_ARROW")&&thief.x <=550) {
      thief.x = thief.x+30;
      thief.changeAnimation("thief",thief_right);
    }
    if(keyDown("LEFT_ARROW")&& thief.x >= 50) {
      thief.changeAnimation("thief",thief_left);
      thief.x = thief.x-30;
    }
    fill("red");
    stroke("black");
    textSize(20);
    text("Score : " + score,20,20);
    if(carsGroup.isTouching(thief)) { //yellow car
        score = score - 1;
    }
    if(carsGroup1.isTouching(thief)) { //lamborghini
        score = score - 1;
    }
    if(carsGroup2.isTouching(thief)) { //green car
        score = score + 1;
    }
    if(carsGroup4.isTouching(thief)) {  //green car2
          score = score + 1;
    }
    if(carsGroup3.isTouching(thief)) { //red car
          end();
       }
    if(score === 0) {
      end();
    }
  }
  drawSprites(); 
}
function start() {
  background(0);
  thief.visible = false;
  gameover.visible = false; 
  click.visible = true;
  fill("white");
  textSize(20);
  noStroke();
  text("STORY:",10,20);
  text("          You are a thief in this game. You've done a bank robbery.",10,40);
  text("You have to escape from police. Everyone are chasing you.",10,60);
  text("INSTRUCTIONS:",10,100);
  text("1.Use arrow keys to control thief.",10,120);
  text("2.Escape from the vehicles",10,140);
  text("3.Do not touch to red cars",10,160);
  text("4.there are some green cars which help you to increse your",10,180);
  text("survaival time",10,200);
  text("                If your survaival time = 0    ",50,240);
  text("                You will lose the game ",50,260);
  fill("red");
  textSize(30);
  text("ALL THE BEST",200,320);
  lamborghiniSound.stop();
  carSound.stop();
  //text("")  
}
function play() {   
}
function end() {
  bg.visible = false;
  background(0);
  score = 0;
  click.visible = true;
  thief.visible = false;
  gameover.visible = true; 
  carsGroup.destroyEach();
  carsGroup1.destroyEach();
  carsGroup2.destroyEach();
  carsGroup3.destroyEach();
  carsGroup4.destroyEach();
  busesGroup1.destroyEach();
  lamborghiniSound.stop();
  carSound.stop();
}