let level = 1;
let loaded = 0;

//setup canvas------------------------------------------------------------
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

let canvas3 = document.getElementById('bottom');
let bctx = canvas3.getContext('2d');
bctx.canvas.width  = window.innerWidth;
bctx.canvas.height = window.innerHeight;
bctx.imageSmoothingEnabled = false;

bctx.translate(0, canvas.height);
//------------------------------------------------------------




//draw background------------------------------------------------------------
let bgd = new Image();
bgd.src = "/assets/img/background.png";
var ratio;

bgd.addEventListener("load", function () {
    var hRatio = canvas.width / bgd.width;
    var vRatio = canvas.height / bgd.height;
    ratio = Math.max(hRatio, vRatio);
    ctx.drawImage(bgd, 0, 0, bgd.width * ratio, bgd.height * ratio);
    loaded++;
})

let tlt = new Image();
tlt.src = "/assets/img/title.png"
var trt;
tlt.addEventListener("load", function () {
    trt = Math.max((canvas.width / 2) / tlt.width, (canvas.height/5) / tlt.height);
    ctx.drawImage(tlt, (canvas.width - tlt.width * trt)/2, 50, tlt.width * trt, tlt.height * trt);
    loaded++;
})

// draw grass
let grs = new Image();
grs.src = "/assets/img/grass.png";
let lastGrass = 0;
let rt;

grs.addEventListener("load", function () {
    rt = (canvas.height / 6) / grs.height;
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        lastGrass++;
    }
    loaded++;
})

let drt = new Image();
drt.src = "/assets/img/dirt.png";
drt.addEventListener("load", function () {
    loaded++;
})

let wll = new Image();
wll.src = "/assets/img/wall.png";
wll.addEventListener("load", function () {
    loaded++;
})
//------------------------------------------------------------




//init player------------------------------------------------------------

let telp = new Image();
let telrt;
telp.src = "/assets/img/teleporter.png"
telp.addEventListener("load", function () {
    loaded++;
})

let prt;

let player = new Image();
player.src = "/assets/img/frame1.png";
player.addEventListener("load", function () {
    prt = (canvas.height / 5) / player.height;
    loaded++;
})


let players = [0, 0, 0, 0, 0, 0], playerfs = [0, 0, 0, 0, 0, 0];

for (let i = 1; i < 7; i++) {
    players[i-1] = new Image();
    players[i-1].src = "/assets/img/frame" + i + ".png";
    players[i-1].addEventListener("load", function () {
        loaded++;
    })
    playerfs[i-1] = new Image();
    playerfs[i-1].src = "/assets/img/frame" + i + "f.png";
    playerfs[i-1].addEventListener("load", function () {
        loaded++;
    })
}
//------------------------------------------------------------
  




//OI ------------------------------------------------------------
let frame = 0;
let timer = 0;

let playerX = 20, playerY = canvas.height / 4, dX = 0, dY = 1;
let flipped = false;
let falling = true;
let jumping = false;
let pressed = false;

let tpDown = false, tpUp = false, tpY = 0, curY = 0, goalY = 0;

document.addEventListener('keydown', function (event) {
    if (event.key == 'a' || event.key == 'd' || event.key == 'w') {
        pressed = true;
    }
    if (!tpDown && !tpUp) {
        if (event.key == 'a') {
            dX = -0.6 * prt;
            flipped = true;
        }
        if (event.key == 'd') {
            dX = 0.6 * prt;
            flipped = false;
        }
    } else {
        if (event.key == 'a') {
            flipped = true;
        }
        if (event.key == 'd') {
            flipped = false;
        }
    }
    if (event.key == 'w') {
        if(!jumping && !falling) {
            dY = -2 * prt;
            jumping = true;
        }
    }
    if (event.key == '1' && onTelp) {
        if (level == 1) {
            tpDown = true;
            tpY = -4;
            goalY = parseInt(-canvas.height * 3/4);
        } else if (level == 2) {
            goalY = 0;
            tpY = 4;
            tpUp = true;
        }
    }
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'a' || event.key == 'd') {
        dX = 0;
    }
})
//------------------------------------------------------------



let grassDrawn = false;
let onTelp = false;


function draw() {
    curY += tpY;
    ctx.translate(0, tpY);
    ctx.clearRect(0, -curY, canvas.width, canvas.height);
    ctx.drawImage(bgd, 0, -curY, bgd.width * ratio, bgd.height * ratio);
    let cnt = 0;
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        cnt++;
        if (cnt > lastGrass-3 && cnt != lastGrass) {
            ctx.drawImage(wll, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
        } else {
            ctx.drawImage(grs, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
        }
    }
    ctx.drawImage(tlt, (canvas.width - tlt.width * trt) / 2, 50, tlt.width * trt, tlt.height * trt);

    bctx.translate(0, tpY);
    bctx.clearRect(0, curY, canvas.width, canvas.height);
    for (let j = 0; j < canvas.height; j += grs.height * rt) {
        for (let i = 0; i < canvas.width; i += grs.width * rt) {
            if (i != 0 && i + grs.width * rt < canvas.width) {
                bctx.drawImage(wll, i, j, wll.width * rt, wll.height * rt);
            } else {
                bctx.drawImage(drt, i, j, drt.width * rt, drt.height * rt);
            }
        }
    }

    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        bctx.drawImage(drt, i, (canvas.height*3/4) - drt.height * rt, drt.width * rt, drt.height * rt);
    }
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        bctx.drawImage(drt, i, (canvas.height*3/4), drt.width * rt, drt.height * rt);
    }
}


function update() {
    if (loaded >= 19) {

        telrt = (2 * grs.width * rt) / telp.width;
        

        if (!grassDrawn) {
            let cnt = 0;
            for (let i = 0; i < canvas.width; i += grs.width * rt) {
                cnt++;
                if (cnt > lastGrass-3 && cnt != lastGrass) {
                    ctx.drawImage(wll, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
                } else {
                    ctx.drawImage(grs, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
                }
            }

            grassDrawn = true;
        }

        let telX = lastGrass * grs.width * rt - grs.width * rt * 3;
        let telY = canvas.height - grs.height * rt - telp.height * telrt + prt*2;

        //calc position
        uctx.clearRect(0, 0, canvas.width, canvas.height);
        playerX += dX;
        playerX = Math.max(playerX, 0);
        playerX = Math.min(playerX, canvas.width - player.width * prt);
        playerY = Math.min(canvas.height - grs.height * rt - player.height * prt, playerY + dY);


        if (!tpDown && !tpUp && playerX >= telX - player.width * prt/2 && playerX <= telX + telp.width * telrt - player.width*prt/2 && playerY == canvas.height - grs.height * rt - player.height * prt) {
            onTelp = true;
            uctx.font = 3 * prt + 'px sans serif';
            if (level == 1) {
                uctx.fillText('[1] to travel down', telX - canvas.width / 25, playerY - 10);
            } else if (level == 2) {
                uctx.fillText('[1] to travel up', telX - canvas.width / 25, playerY - 10);
            }
        }


        //jump/fall --------------
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
                dY = Math.min(dY * (1.05 + (prt / 500)), 10);
            }
        }


        
        //render player --------------
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
        uctx.drawImage(telp, telX, telY, telp.width * telrt, telp.height * telrt)
        //uctx.drawImage(drt, telX, telY + telp.height * telrt, telp.width, telp.width);
        uctx.drawImage(player, playerX, playerY, player.width * prt, player.height * prt);

        if (!pressed) {
            uctx.font = 3*prt + 'px sans serif';
            uctx.fillText('[A],[D] to move, [W] to jump', playerX, playerY - 20);
        }



        if (tpDown) {
            if (curY > goalY) {
                draw();

            } else {
                tpDown = false;
                tpY = 0;
                level = 2;
            }
        } else if (tpUp) {
            if (curY < goalY) {
                draw();
            } else {
                bctx.clearRect(0, -4, canvas.width, canvas.height);
                tpUp = false;
                tpY = 0;
                level = 1;
            }
        }
    }
}



setInterval(update, 10);
