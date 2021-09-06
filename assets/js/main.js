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
let bgd = new Image();
bgd.src = "/assets/img/background.png";
var ratio;

bgd.addEventListener("load", function () {
    var hRatio = canvas.width / bgd.width;
    var vRatio = canvas.height / bgd.height;
    ratio = Math.max(hRatio, vRatio);
    ctx.drawImage(bgd, 0, 0, bgd.width * ratio, bgd.height * ratio);
})


let grs = new Image();
grs.src = "/assets/img/grass.png";

let rt;

//draw grass
grs.addEventListener("load", function () {
    rt = (canvas.height / 6) / grs.height;
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        ctx.drawImage(grs, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
    }
})


let prt;

let player = new Image();
player.src = "/assets/img/frame1.png";
player.addEventListener("load", function () {
    prt = (canvas.height / 5) / player.height;
})
  

let frame = 0;
let timer = 0;

let playerX = 20, playerY = canvas.height / 4, dX = 0, dY = 1;
let flipped = false;
let falling = true;
let jumping = false;

console.log(prt);

document.addEventListener('keydown', function (event) {
    if (event.key == 'a') {
        dX = -0.5 * prt;
        flipped = true;
    }
    if (event.key == 'd') {
        dX = 0.5 * prt;
        flipped = false;
    }
    if (event.key == 'w') {
        if(!jumping && !falling) {
            dY = -2 * prt;
            jumping = true;
        }
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'a' || event.key == 'd') {
        dX = 0;
    }
})

let players = [], playerfs = [];
for (let i = 1; i < 7; i++) {
    let pl = new Image();
    pl.src = "/assets/img/frame" + i + ".png";
    pl.addEventListener("load", function () {
        players.push(pl);
    })
    let pl2 = new Image();
    pl2.src = "/assets/img/frame" + i + "f.png";
    pl2.addEventListener("load", function () {
        playerfs.push(pl2);
    })
}


function update() {
    uctx.clearRect(0, 0, canvas.width, canvas.height);
    playerX += dX;
    playerX = Math.max(playerX, 0);
    playerX = Math.min(playerX, canvas.width - player.width * prt);
    playerY = Math.min(canvas.height - grs.height * rt - player.height * prt, playerY + dY);

    if (jumping) {
        dY *= 0.9;
        if (dY > -1) {
            jumping = false;
            falling = true;
            dY = 2;
        }
    } else {
        if (playerY == canvas.height - grs.height * rt - player.height * prt) {
            falling = false;
            dY = 0;
        } else {
            falling = true;
            dY = Math.min(dY * (1.05 + (prt/500)), 10);
        }
    }

    if (dX == 0) {
        if (flipped) {
            player = playerfs[5];
        } else {
            player = players[5];
        }
    } else {
        timer++;
        if (timer == 10) {
            timer = 0;
            frame = (frame + 1) % 6;
        }
        if (flipped) {
            player = playerfs[frame];
        } else {
            player = players[frame];
        }

    }
    uctx.drawImage(player, playerX, playerY, player.width * prt, player.height * prt);
}


setInterval(update, 10);

/*window.addEventListener('resize', function(event){
    draw();
});*/