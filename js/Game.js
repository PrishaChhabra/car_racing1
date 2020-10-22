class Game{
    constructor(){}
getState(){
    var gameStateref=database.ref('gameState')
    gameStateref.on("value",function(data){
        gameState=data.val();
    })

}
update(state){
    database.ref('/').update({
        gameState:state
    })
}

async start(){
    if(gameState===0){
        player=new Player();
        var playerCountRef=await database.ref('playerCount').once("value")
        if(playerCountRef.exists()){
            playerCount=playerCountRef.val()
            player.getCount();
        }
        
        form=new Form();
        form.display();
    }
car1=createSprite(100,200);
car1.addImage("car1",car1Img)
car2=createSprite(300,200);
car2.addImage("car2",car2Img)
car3=createSprite(500,200);
car3.addImage("car3",car3Img)
car4=createSprite(700,200);
car4.addImage("car4",car4Img)
cars=[car1,car2,car3,car4];

}

play(){
    form.hide();
    //textSize(30);
    //text("Game Starts",150,100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers!==undefined){
        background("brown")
        image(trackImg,0,-displayHeight*10,displayWidth,displayHeight*11)
        var index=0
        var x=175
        var y;
        //var displayPos=130
        for(var plr in allPlayers){
            index=index+1
            x=x+200;
            y=displayHeight-allPlayers[plr].distance;
            cars[index-1].x=x
            cars[index-1].y=y

            if(index===player.index){
                fill("red")
                ellipse(x,y,60,60);
                cars[index-1].shapeColor="red";
                camera.position.x=displayWidth/2;
                camera.position.y=cars[index-1].y;
            }

            /*else {fill("black")}
            displayPos+=20
            textSize(15)
            text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,displayPos);
            */

        }
    }
    if(keyIsDown(UP_ARROW)&& player.index!==null){
        player.distance+=10
        player.update();
        console.log(player.distance)
        carSound.play();
        textSize(20)
        text("Your Rank="+player.rank,displayWidth/2-50,y-120)
    }
    if(player.distance>8500){
        gameState=2
        player.rank+=1
        Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
}
end(){
console.log("Game ended")
console.log(player.rank)

//game.update(2);
}
}