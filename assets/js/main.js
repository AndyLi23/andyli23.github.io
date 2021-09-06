let level = 1;

//setup
let canvas = document.getElementById('main');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;

let canvas2 = document.getElementById('update');
let uctx = canvas2.getContext('2d');
uctx.canvas.width  = window.innerWidth;
uctx.canvas.height = window.innerHeight;
uctx.imageSmoothingEnabled = false;



//draw background
if (level == 1) {
    let bgd = new Image();
    bgd.src = "/assets/img/background.png";
    var hRatio = canvas.width / bgd.width;
    var vRatio = canvas.height / bgd.height;
    var ratio = Math.max(hRatio, vRatio);

    bgd.addEventListener("load", function () {
        ctx.drawImage(bgd, 0, 0, bgd.width * ratio, bgd.height * ratio);
    })
}


let grs = new Image();
grs.src = "/assets/img/grass.png";

let rt = (canvas.height / 6) / grs.height;

//draw grass
if (level == 1) {
    grs.addEventListener("load", function () {
        for (let i = 0; i < canvas.width; i += grs.width * rt) {
            ctx.drawImage(grs, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
        }
    })

}


let player = new Image();
player.src = "/assets/img/frame1.png";
  

let frame = 0;
let timer = 0;

let playerX = 20, playerY = canvas.height / 4, dX = 0, dY = 1;
let flipped = false;
let falling = true;
let jumping = false;

document.addEventListener('keydown', function (event) {
    if (event.key == 'a') {
        dX = -3;
        flipped = true;
    }
    if (event.key == 'd') {
        dX = 3;
        flipped = false;
    }
    if (event.key == 'w') {
        if(!jumping && !falling) {
            dY = -10;
            jumping = true;
        }
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'a' || event.key == 'd') {
        dX = 0;
    }
})


function update() {
    uctx.clearRect(0, 0, canvas.width, canvas.height);
    playerX += dX;
    playerY = Math.min(canvas.height - grs.height * rt - player.height * 8, playerY + dY);

    if (jumping) {
        dY *= 0.9;
        if (dY > -1) {
            jumping = false;
            falling = true;
            dY = 2;
        }
    } else {
        if (playerY == canvas.height - grs.height * rt - player.height * 8) {
            falling = false;
            dY = 0;
        } else {
            falling = true;
            dY *= 1.05;
        }
    }

    if (dX == 0) {
        if (flipped) {
            player.src = "/assets/img/frame6f.png";
        } else {
            player.src = "/assets/img/frame6.png";
        }
    } else {
        timer++;
        if (timer == 10) {
            timer = 0;
            frame = (frame + 1) % 6;
        }
        if (flipped) {
            player.src = "/assets/img/frame" + (frame + 1) + "f.png";
        } else {
            player.src = "/assets/img/frame" + (frame + 1) + ".png";
        }

    }
    uctx.drawImage(player, playerX, playerY, player.width * 8, player.height * 8);
}


setInterval(update, 10);

/*window.addEventListener('resize', function(event){
    draw();
});*/