var balloon;
var database;
var height;
var backgroundImage; 

function preload() {
  backgroundImg = loadImage("Images/BackgroundImage.png");
}

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    balloon = createSprite(100,300,10,10);
    balloon = loadAnimation("Images/Balloon1.png","Images/Balloon2.png","Images/Balloon3.png");
    

    var balloonPosition = database.ref("balloon/height");
    balloonPosition.on("value", readPosition, showError);

}

function draw(){
  background(backgroundImage);

  if(keyDown(LEFT_ARROW)){
      balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
      balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){  
      balloon.y = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
      balloon.y = balloon.y +10;
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref("ball/height").ser({
  
     'x': height.x + x,
     'y': height.y + y,
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in reading Info from database");
}
