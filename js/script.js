class Zombie {
    
    constructor(obj){
        
        this.object = obj;
        
    }
    zombieMoving() {
        
        let zombieTimeout = this.zombieTimeoutGenerator(),
            zombieSpeed = this.zombieSpeedGenerator(this.minSpeed, this.maxSpeed);
        
        this.object.delay(zombieTimeout).animate(
        {
            top: areaHeight,
        }, zombieSpeed);
        
    };
    
    zombieTimeoutGenerator() {
        return Math.round(Math.random() * 1000);
    };
    
    zombieSpeedGenerator(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    zombieKilling() {
         
        var interval = setInterval(() => {
            
            $(this.object[0]).position().top = $(this.object[0]).position().top;
            
            if ($(this.object[0]).position().top >= 600) {
                this.loseGame();
                clearInterval(interval);
            };
        }, 30);
        
        this.object.on("click", () => {
            clearInterval(interval);
                if ($(this.object[0]).position().top < 600) {
                    this.object.hide();
                    this.zombieCounter();
                };
        });
    };
    
    zombieCounter() {
        
        let counter = $(".zombie-counter");
        console.log(counter)
        counter.text((parseInt(counter.text(), 10) + 1).toString());
      
    };
    
    loseGame() {
        alert("gra skończona");
    };
};


class ZombieSlow extends Zombie {
    
    constructor(obj) {
        super(obj);
        
        this.minSpeed = 10000;
        this.maxSpeed = 11000;
        
        this.zombieMoving();
        this.zombieKilling();
        
    };
};
class ZombieFast extends Zombie {
    
    constructor(obj) {
        super(obj);
        
        this.minSpeed = 5000;
        this.maxSpeed = 6000;
        
        this.zombieMoving();
        this.zombieKilling();
        
    };
};

var gameArea = $(".game-area"),
    areaHeight = gameArea.outerHeight(),
    areaWidth = gameArea.outerWidth(),
    zombieTypes = [ZombieFast, ZombieSlow];

function generatePositions(quantity, min, max) {
    
    var widthsArray = [];
    
    for(var i = 0; i < quantity; i++) {
        
        min = Math.ceil(min);
        max = Math.floor(max);
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        widthsArray.push(random);
        
    };
    return widthsArray;
};

function createZombie(quantity) {
    
    var zombieArray = [],
        HTMLZombies = [],
        params = generatePositions(quantity, 0, areaWidth - 50);
    
    for (var i = 0; i < quantity; i++) {
        
        let zombieType = randomNumbers(0, zombieTypes.length - 1);

        var zombie = $("<div>zombie</div>")
        .css("left", params[i])
        .addClass(`zombie ${zombieTypes[zombieType].name}`).appendTo(gameArea);
        
        HTMLZombies.push(zombie);
        zombieArray.push(new zombieTypes[zombieType](zombie));
    };
    
};

function randomNumbers(min, max) {
    
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}

setInterval(function() {
    
    createZombie(2);
    
}, 1500);





