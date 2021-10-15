class Game {
   
  constructor(){
    this.score =0;
    this.a = Math.round(10*Math.random(1,2));
    this.b = Math.round(10*Math.random(2,3));
    this.c = this.a*this.b;
    this.button = createButton(this.c);
    this.button2 = createButton((this.b*this.a)-5);
    this.button3 = createButton("Choose the correct solution " + this.a +"*"+  this.b);
  
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,400);
    car1.shapeColor = "red";
    car2 = createSprite(300,400);
    car2.shapeColor = "blue";
   /* car3 = createSprite(500,400);
    car3.shapeColor = "white";
    car4 = createSprite(700,400);
    car4.shapeColor = "yellow";*/
    cars = [car1, car2, car3, car4];

    
  }

  play(){
    form.hide();

    player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,0,displayWidth, displayHeight);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        //y = displayHeight - allPlayers[plr].distance;
        y = displayHeight -100;
        cars[index-1].x = x;
        cars[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name ,cars[index-1].x,cars[index-1].y+75);
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    
    text("score : "+this.score,100,600);
    
    if(this.score == 5){
      gameState = 2;
      player.rank = player.rank+1;
      text("rank : "+player.rank,100,500);
      player.updateFinishedPlayers();
    }
   //console.log(player.rank);
   //console.log(player.distance);
    drawSprites();
  }

  end(){
   // console.log("Game Ended" + player.rank);

     
  }
 /* disp(){
    var a = Math.round(10*Math.random(1,2));
    var b = Math.round(10*Math.random(2,3));
    var c = a*b;
    var button = createButton(c);
    button.position(displayWidth/2 -40, displayHeight/2+40);
    var button2 = createButton((b*a)-5);
    button2.position(displayWidth/2 + 100, displayHeight/2+40);
    var button3 = createButton("Choose the correct solution " + a +"*"+  b);
    button3.position(displayWidth/2 , displayHeight/2);
  }*/
  disp(){ 
    
    if(this.a%2 == 0 ){
    this.button.position(displayWidth/2 -40, displayHeight/2+40);
    this.button2.position(displayWidth/2 + 100, displayHeight/2+40);
    }
    else{
    this.button.position(displayWidth/2 +100, displayHeight/2+40);
    this.button2.position(displayWidth/2 + -40, displayHeight/2+40);
    }
    this.button3.position(displayWidth/2 , displayHeight/2);

    /*if(this.button.mousePressed()){
      this.score = this.score +1;
      this.a = Math.round(10*Math.random(1,2));
      this.b = Math.round(10*Math.random(2,3));
      this.c = this.a*this.b;
    }*/
    this.button.mousePressed(()=>{
      this.score = this.score +1;
    this.a = Math.round(10*Math.random(1,2));
    this.b = Math.round(10*Math.random(2,3));
    this.c = this.a*this.b;
    this.button = createButton(this.c);
    this.button2 = createButton((this.b*this.a)-5);
    this.button3 = createButton("Choose the correct solution " + this.a +"*"+  this.b);
      
    });
  }
  
}
