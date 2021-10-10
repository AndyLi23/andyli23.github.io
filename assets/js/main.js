let interval;
let curTml = -1;
let level = 1;

let game = function () {
let loaded = 0;
let counter = 100;

//setup canvas------------------------------------------------------------
let canvas = document.getElementById('main');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;
ctx.translate(0, 0);

let canvas2 = document.getElementById('update');
let uctx = canvas2.getContext('2d');
uctx.canvas.width  = window.innerWidth;
uctx.canvas.height = window.innerHeight;
uctx.imageSmoothingEnabled = false;
uctx.translate(0, 0);

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


//big floating cloud thing
let tlt = new Image();
tlt.src = "/assets/img/title.png"
var trt;
tlt.addEventListener("load", function () {
    trt = Math.min((canvas.width/1.2) / tlt.width, (canvas.height/5)/tlt.height);
    ctx.drawImage(tlt, (canvas.width - tlt.width * trt)/2, 50, tlt.width * trt, tlt.height * trt);
    loaded++;
})

let sec = new Image();
sec.src = "/assets/img/secret.png";
let secrt;
sec.addEventListener("load", function () {
    secrt = Math.min((canvas.width / 1.5) / sec.width, (canvas.height / 5) / sec.height);
    loaded++;
})

// draw grass
let grs = new Image();
grs.src = "/assets/img/grass.png";
let lastGrass = 0;
let rt;

grs.addEventListener("load", function () {
    rt = Math.min((canvas.width / 13) / grs.width * 0.9, (canvas.height / 5)/grs.height);
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        lastGrass++;
    }
    loaded++;
})

//dirt and wall
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

let tml = new Image();
tml.src = "/assets/img/sim.png";
tml.addEventListener("load", function () {
    loaded++;
})


let tmls = [0, 0, 0, 0];
for (let i = 0; i < 4; i++) {
    tmls[i] = new Image();
}
tmls[0] = tml;
tmls[1].src = "/assets/img/battle-city.png";
tmls[2].src = "/assets/img/bash-help.png";
tmls[3].src = "/assets/img/usaco.png";
for (let i = 1; i < 4; i++) {
    tmls[i].addEventListener("load", function () {
        loaded++;
    })
}

//------------------------------------------------------------




//init player------------------------------------------------------------
//teleporter (updates with player)
let telp = new Image();
let telrt;
telp.src = "/assets/img/teleporter.png"
telp.addEventListener("load", function () {
    loaded++;
})


//main player for calculations
let prt;

let player = new Image();
player.src = "/assets/img/frame1.png";
player.addEventListener("load", function () {
    prt = Math.min((canvas.width / 13) / grs.width, (canvas.height/5) / grs.height);
    loaded++;
})


//player walking frames
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

//movement vars
let playerX = 20, playerY = 0, dX = 0, dY = 1;
let flipped = false;
let falling = true;
let jumping = false;
let pressed = false;


let apressed = false, dpressed = false, wpressed = false;
let sites = ["https://sim.amhsrobotics.com", "https://github.com/AndyLi23/Battle-City", "https://github.com/AndyLi23/BashHelp", "https://github.com/AndyLi23/usaco"];

//teleporting vars
let tpDown = false, tpUp = false, tpY = 0, curY = 0, goalY = 0;

document.addEventListener('keydown', function (event) {
    //cancel instructions
    if (event.key == 'a' || event.key == 'd' || event.key == 'w') {
        pressed = true;
    }

    if (event.key == 'a') {
        apressed = true;
    }
    if (event.key == 'd') {
        dpressed = true;
    }

    //jump
    if (event.key == 'w') {
        wpressed = true;
    }

    //teleport up/down
    if (event.key == '1') {
        if (onTelp && curTml == -1) {
            if (level == 1) {
                tpDown = true;
                tpY = -ratio * 5;
                goalY = parseInt(-canvas.height * 3 / 4);
            } else if (level == 2) {
                goalY = 0;
                tpY = ratio * 5;
                tpUp = true;
            }
            dX = 0;
        } else if (curTml != -1) {
            window.open(sites[curTml], "_blank", "noopener").focus();
        }
    }
})

//stop moving
document.addEventListener('keyup', function (event) {
    if (event.key == 'a') {
        apressed = false;
    } else if (event.key == 'd') {
        dpressed = false;
    } else if (event.key == 'w') {
        wpressed = false;
    }
})
//------------------------------------------------------------



let grassDrawn = false;
let onTelp = false;


function draw() {
    //translate top level up/down
    curY += tpY;
    ctx.translate(0, tpY);
    ctx.clearRect(0, -curY, canvas.width, canvas.height);

    //redraw background and grass
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


    //translate bottom level up/down
    bctx.translate(0, tpY);
    bctx.clearRect(0, curY-10, canvas.width, canvas.height+10);

    //draw wall
    for (let j = 0; j < canvas.height; j += grs.height * rt) {
        for (let i = 0; i < canvas.width; i += grs.width * rt) {
            if (i != 0 && i + grs.width * rt < canvas.width) {
                bctx.drawImage(wll, i, j, wll.width * rt, wll.height * rt);
            } else {
                bctx.drawImage(drt, i, j, drt.width * rt, drt.height * rt);
            }
        }
    }

    //draw floor (second is to prevent rounding error)
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        bctx.drawImage(drt, i, (canvas.height*3/4) - drt.height * rt, drt.width * rt, drt.height * rt);
    }
    for (let i = 0; i < canvas.width; i += grs.width * rt) {
        bctx.drawImage(drt, i, (canvas.height*3/4), drt.width * rt, drt.height * rt);
    }

    bctx.drawImage(sec, (canvas.width - sec.width * secrt) / 2, 50, sec.width * secrt, sec.height * secrt);


    let pts = (((lastGrass - 3) * grs.width * rt) - grs.width * rt) / 4;
    let tmlrt = Math.min((pts * 0.8) / tml.width, (canvas.height * 0.75 - grs.height*rt)/tml.height);

    for (let i = 0; i < 4; i++) {
        bctx.drawImage(tmls[i], (grs.width * rt) + pts * i + pts*0.1, (canvas.height * 3 / 4) - tml.height * tmlrt - drt.height * rt, tml.width * tmlrt, tml.height * tmlrt);
    }
}


//main update -------------------------------------------------------------
function update() {
    //make sure all images are loaded
    if (counter <= 0) {
        if (loaded < 23) {
            clearInterval(interval);
            curTml = -1;
            level = 1;
            game();
            counter = 100;
        }
    } else {
        counter--;
    }

    if (loaded >= 23) {
        console.log(loaded);

        telrt = (2 * grs.width * rt) / telp.width;
        
        //draw grass when it loads
        if (!grassDrawn) {
            playerY = canvas.height - grs.height*rt - 3*player.height * prt;
            let cnt = 0;
            for (let i = 0; i < canvas.width; i += grs.width * rt) {
                cnt++;
                if (cnt > lastGrass-3 && cnt != lastGrass) {
                    ctx.drawImage(wll, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
                } else {
                    ctx.drawImage(grs, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
                }
            }

            ctx.drawImage(tlt, (canvas.width - tlt.width * trt)/2, 50, tlt.width * trt, tlt.height * trt);

            grassDrawn = true;
        }
        
        //teleporter position
        let telX = lastGrass * grs.width * rt - grs.width * rt * 3;
        let telY = canvas.height - grs.height * rt - telp.height * telrt + prt * 2;
        
        //calc position
        if (!tpUp && !tpDown) {
            if (dpressed) {
                dX = 0.6 * prt;
            } else if (apressed) {
                dX = -0.6 * prt;
            } else {
                dX = 0;
            }
        }
        if (wpressed) {
            if(!jumping && !falling) {
                dY = prt * -1.5;
                jumping = true;
            }
        }
        if (dpressed) {
            flipped = false;
        } else if (apressed) {
            flipped = true;
        }

        uctx.clearRect(0, 0, canvas.width, canvas.height);
        playerX += dX;
        playerX = Math.max(playerX, 0);
        playerX = Math.min(playerX, canvas.width - player.width * prt);
        playerY = Math.min(canvas.height - grs.height * rt - player.height * prt, playerY + dY);
        if (level == 2) {
            playerX = Math.max(playerX, grs.width * rt);
            playerX = Math.min(playerX, (lastGrass-1) * grs.width * rt - player.width * prt);
        }


        if (!tpDown && !tpUp && playerX >= telX && playerX <= telX + telp.width * telrt - player.width*prt) {
            onTelp = true;
            uctx.beginPath();
            uctx.fillStyle = "#ffffff";
            uctx.rect(telX, canvas.height - grs.height * rt - player.height * prt - 10 - Math.max(3 * prt, 14), Math.max(3 * prt, 14)*7, Math.max(3 * prt, 14)+5);
            uctx.fill();
            uctx.fillStyle = "#000000";
            uctx.font = Math.max(3 * prt, 14) + 'px sans serif';
            if (level == 1) {
                uctx.fillText('[1] go down', telX, canvas.height - grs.height * rt - player.height * prt - 10);
            } else if (level == 2) {
                uctx.fillText('[1] go up', telX, canvas.height - grs.height * rt - player.height * prt - 10);
            }
        } else {
            onTelp = false;
        }

        curTml = -1;
        if (level == 2) {
            for (let i = 0; i < 4; i++) {
                let pts = (((lastGrass - 3) * grs.width * rt) - grs.width * rt) / 4;
                let tmlrt = Math.min((pts * 0.8) / tml.width, (canvas.height * 0.75 - grs.height * rt) / tml.height);
                let tmlpos = (grs.width * rt) + pts * i + pts * 0.1;
                if (playerX >= tmlpos - player.width * prt * 0.2 && playerX <= tmlpos + tml.width * tmlrt - player.width * prt * 0.2) {
                    uctx.beginPath();
                    uctx.fillStyle = "#ffffff";
                    uctx.rect(playerX, playerY -10 - Math.max(3 * prt, 14), Math.max(3 * prt, 14) * 7, Math.max(3 * prt, 14) + 5);
                    uctx.fill();
                    uctx.fillStyle = "#000000";
                    uctx.font = Math.max(3 * prt, 14) + 'px sans serif';
                    uctx.fillText('[1] explore', playerX, playerY-10);
                    curTml = i;
                }
            }
        }


        //jump/fall --------------
        if (jumping) {
            dY *= 0.9;
            if (dY > -prt/5) {
                jumping = false;
                falling = true;
                dY = prt/5;
            }
        } else {
            if (playerY == canvas.height - grs.height * rt - player.height * prt) {
                falling = false;
                dY = 0;
            } else {
                falling = true;
                dY = Math.min(dY * 1.08, 15);
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

        //draw teleporter and player
        uctx.drawImage(telp, telX, telY, telp.width * telrt, telp.height * telrt)
        uctx.drawImage(player, playerX, playerY, player.width * prt, player.height * prt);
        

        //initial instructions
        if (!pressed) {
            uctx.beginPath();
            uctx.fillStyle = "#ffffff";
            uctx.rect(playerX-5, playerY - 20 - Math.max(3 * prt, 14), Math.max(3 * prt, 14)*9, Math.max(3 * prt, 14)+5);
            uctx.fill();
            uctx.fillStyle = "#000000";
            uctx.font = Math.max(3 * prt, 14) + 'px sans serif';
            uctx.fillText('[WAD] to move', playerX, playerY - 20);
        }


        //handle teleporting
        if (tpDown) {
            if (curY > goalY) {
                draw();

            } else {
                tpDown = false;
                tpY = 0;
                level = 2;
                tpY = goalY - curY;
                draw();
            }
        } else if (tpUp) {
            if (curY < goalY) {
                draw();
            } else {
                bctx.clearRect(0, -4, canvas.width, canvas.height);
                tpUp = false;
                tpY = 0;
                level = 1;
                tpY = goalY - curY;
                draw();
            }
        }
    }
}


//100fps :)
interval = setInterval(update, 10);
}

curTml = -1;
level = 1;
game();

window.addEventListener('resize', function () {
    clearInterval(interval);
    curTml = -1;
    level = 1;
    game();
});