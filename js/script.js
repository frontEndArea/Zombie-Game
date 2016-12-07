class NewGame {
    
    constructor() {
        
 
        
        setInterval(() => {
    
            this.createZombie(1);
            
        }, 5000);    
    };
    
    
    
    
    generatePositions(quantity, min, max) {
        
        var widthsArray = [];
    
        for(var i = 0; i < quantity; i++) {

            min = Math.ceil(min);
            max = Math.floor(max);
            let random = Math.floor(Math.random() * (max - min + 1)) + min;
            widthsArray.push(random);

        };
        return widthsArray;
    };
    
    createZombie(quantity) {
        
        var zombieArray = [],
        HTMLZombies = [],
        params = this.generatePositions(quantity, 0, areaWidth - 50);

        for (var i = 0; i < quantity; i++) {

            let zombieType = this.randomNumbers(0, zombieTypes.length - 1);

            var zombie = $("<div></div>")
            .css("left", params[i])
            .addClass(`zombie ${zombieTypes[zombieType].name}`).appendTo(gameArea);

            HTMLZombies.push(zombie);
            zombieArray.push(new zombieTypes[zombieType](zombie));
            return zombieArray;
            
        };
    };
    
    randomNumbers(min, max) {
        
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        
    };
};

class Zombie {
    
    constructor(obj){
        
        this.object = obj;  
        
    };
    
    zombieMoving() {
        
        let zombieTimeout = this.zombieTimeoutGenerator(),
            zombieSpeed = this.zombieSpeedGenerator(this.minSpeed, this.maxSpeed);
        
        this.object.delay(zombieTimeout).animate({
            top: areaHeight
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
            
            if($(this.object[0]).position().top >= 600) {
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
        
        counter.text((parseInt(counter.text(), 10) + 1).toString());
      
    };
    
    loseGame() {
       
        $(this.object[0]).remove();
    };
};


class ZombieSlow extends Zombie {
    
    constructor(obj) {
        super(obj);
        
        this.minSpeed = 10000;
        this.maxSpeed = 11000;
        this.health = 3;
        
        $(this.object[0]).attr('title', this.health);
        
        this.zombieMoving();
        this.zombieKilling();
        
    };
};
class ZombieFast extends Zombie {
    
    constructor(obj) {
        super(obj);
        
        this.minSpeed = 15000;
        this.maxSpeed = 16000;
        this.health = 4;
        
        $(this.object[0]).attr('title', this.health);
        
        this.zombieMoving();
        this.zombieKilling();
        
    };
};

class Turret{
    
   
    
    constructor(obj) {
            
        this.obj = obj;
        this.range = 300;
        this.turret = this.obj[0];
        this.turretTop = $(this.turret).position().top;
        this.turretLeft = $(this.turret).position().left;
        this.turretWidth = $(this.turret).width();
        this.turretHeight = $(this.turret).height();
        
        setInterval(() => {
            
            this.createDirection();
            
        }, 500);
                  
    };
    
    noticeZombie(zombie) {
        
        if(!$('.zombie').length) {
            return;
        };
        
        var zombies = $('.zombie')[0],
            eachZombie;
        
        $(zombies).each((index, zombie) => {
            
            if( parseInt($(zombie).position().top, 10) >= (600 - this.range) ) {

                eachZombie =  $(zombie);
                
            };
            
        });    
        
    return eachZombie;
    };
    
    createDirection() {
        
        if(!this.noticeZombie()) {
            return;
        };
        
        let targetInfo = this.noticeZombie();
        
        let targetHTML = $(targetInfo[0]),
            parent = targetHTML.parent()[0],
            parentHeight = $(parent).outerHeight(),
            parentWidth = $(parent).outerWidth();
       
        let targetTop = targetHTML.position().top,
            targetLeft = targetHTML.position().left,
            targetWidth = targetHTML.width(),
            targetHeight = targetHTML.height();
            
        if(targetTop > parentHeight - this.turretHeight - 40) { return; }
        
            let width = targetLeft + targetWidth,
                height = targetTop + targetHeight;                
    
            let bullet = this.shot(),
                bulletY = parseInt(bullet.css('top'), 10),
                bulletX = parseInt(bullet.css('left'), 10),
                bulletWidth = bullet.outerWidth();
        
            var vector = (height - bulletY) / (width - bulletX);
        
            var interval = setInterval(() => {
        
                var left = parseInt(bullet.css("left"), 10),
                    top = parseInt(bullet.css("top"), 10);
                
                
                /*if(top <= targetTop) { 
                    clearInterval(interval);
                    bullet.remove(); 
                    
                    let hp = parseInt(targetHTML.attr('title'));
                   
                    if(--hp === 0) {
                        targetHTML.remove();
                    }; 
                    
                    targetHTML.attr('title', hp.toString());
                };
                */
                if(top > parentHeight || left < 0 || left > parentWidth) { bullet.remove(); };
                
                if(targetLeft + (targetWidth / 2) <= parentWidth - (parentWidth - (this.turretLeft + this.turretWidth / 2))) {
                    
                    if( top >= (targetTop + targetHeight) && left >= targetLeft && left <= (targetLeft + targetWidth) || left <= targetLeft + targetWidth && top < (targetTop + targetHeight) && top >= targetTop) {
                        
                         clearInterval(interval);
                        bullet.remove(); 

                        let hp = parseInt(targetHTML.attr('title'));

                        if(--hp === 0) {
                            targetHTML.remove();
                        }; 

                        targetHTML.attr('title', hp.toString());
                        
                    };
                    
                    bullet.stop().animate({
                        
                        "left": left - (1 * 40),
                        "top": top - (vector * 40)

                    }, 10);
                    
                 } else {
                     
                     
                     if( (left + bulletWidth) >= targetLeft && top <= (targetTop + targetHeight)  && top >= targetTop || top <= targetTop + targetHeight && left >= targetLeft && left <= targetLeft + targetWidth) {
                        
                        clearInterval(interval);
                        bullet.remove(); 

                        let hp = parseInt(targetHTML.attr('title'));

                        if(--hp === 0) {
                            targetHTML.remove();
                        }; 

                        targetHTML.attr('title', hp.toString());
                        
                    };
                     
                     bullet.stop().animate({
                         
                        "left": left + (1 * 40),
                        "top": top + (vector * 40)

                    }, 10);
                     
                 };
                
            }, 10);

    };
    
    shot() {
     
        
        let bullet =  $('<div class="bullet"></div>').appendTo('.game-area');
        bullet.css({
            
            "left": this.turretLeft + this.turretWidth / 2
            
        });
        return bullet;
        
    };
    
};


var gameArea = $(".game-area"),
    areaHeight = gameArea.outerHeight(),
    areaWidth = gameArea.outerWidth(),
    zombieTypes = [ZombieFast, ZombieSlow];





var turret = $('<div class="turret"></div>').appendTo('.game-area');
var turret2 = $('<div class="turret2"></div>').appendTo('.game-area');
var start = $('.start-game');


start.on('click', function(e) {
    e.preventDefault();
    new NewGame();
    new Turret(turret);
    new Turret(turret2);
});


