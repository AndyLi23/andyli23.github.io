let interval;
let curTml = -1;
let level = 1;

let game = function () {
let loaded = 0;

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
    
let canvas4 = document.getElementById('top');
let tctx = canvas4.getContext('2d');
tctx.canvas.width  = window.innerWidth;
tctx.canvas.height = window.innerHeight;
tctx.imageSmoothingEnabled = false;
tctx.translate(0, -canvas.height);
    
var rightButtn = document.getElementById('rightbuttn');
var leftButtn = document.getElementById('leftbuttn');
var upButtn = document.getElementById('upbuttn');
var oneButtn = document.getElementById('onebuttn');
var twoButtn = document.getElementById('twobuttn');
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
    loaded++;
})
    
let cld = new Image();
cld.src = "/assets/img/cloud.png"
cld.addEventListener("load", function () {
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
    
    
//bad pixelart computers--

let sites = ["https://github.com/AndyLi23/usaco", "https://github.com/AndyLi23/BashHelp", "https://github.com/AndyLi23/Battle-City", "https://sim.amhsrobotics.com"];    
    
let tml = new Image();
tml.src = "/assets/img/usaco.png";
tml.addEventListener("load", function () {
    loaded++;
})

let tmls = [0, 0, 0, 0];
for (let i = 0; i < 4; i++) {
    tmls[i] = new Image();
}
tmls[0] = tml;
tmls[1].src = "/assets/img/bash-help.png";
tmls[2].src = "/assets/img/battle-city.png";
tmls[3].src = "/assets/img/sim.png";
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
    
    
    
//ready the ballons!!, said calvin to hobbes :) ---------------
    
let links = ["mailto:andyliqy@gmail.com", "https://instagram.com/andily__", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://github.com/AndyLi23"];
let lnk = new Image();
lnk.src = "/assets/img/mail.png";
lnk.addEventListener("load", function () {
    loaded++;
})


let lnks = [0, 0, 0, 0];
for (let i = 0; i < 4; i++) {
    lnks[i] = new Image();
}
lnks[0] = lnk;
lnks[1].src = "/assets/img/insta.png";
lnks[2].src = "/assets/img/youtube.png";
lnks[3].src = "/assets/img/github.png";
for (let i = 1; i < 4; i++) {
    lnks[i].addEventListener("load", function () {
        loaded++;
    })
}
    
//------------------------------------------------------------
  




//OI ------------------------------------------------------------
let frame = 0;
let timer = 0;

//movement vars
let playerX = 0, playerY = 0, dX = 0, dY = 1;
let flipped = false;
let falling = true;
let jumping = false;
let pressed = false;


let apressed = false, dpressed = false, wpressed = false;

//teleporting vars
let tpDown = false, tpUp = false, tpY = 0, curY = 0, goalY = 0;

//process 2 being clicked
function processTwo() {
    if (onTelp) {
        if (level == 0) {
            tpDown = true;
            tpY = -ratio * 5;
            goalY = 0;
        }
        if (level == 1) {
            tpDown = true;
            tpY = -ratio * 5;
            goalY = parseInt(-canvas.height * 3 / 4);
        }
        dX = 0;
    }
}
    
//process 1 being clicked (dont sue me idk why its after 2)
function processOne() {
    if (onTelp && curTml == -1) {
        if (level == 1) {
            tpUp = true;
            tpY = ratio * 5;
            goalY = parseInt(canvas.height);
        } else if (level == 2) {
            tpUp = true;
            goalY = 0;
            tpY = ratio * 5;
        }
        dX = 0;
    } else if (curTml != -1 && level == 2) {
        window.open(sites[curTml], "_blank").focus();
        curTml = -1;
    } else if (curTml != -1 && level == 0) {
        window.open(links[curTml], "_blank").focus();
        curTml = -1;
    }
}
    
//process keydowns ----   
document.addEventListener('keydown', function (event) {
    //cancel instructions
    if (event.key == 'a' || event.key == 'd' || event.key == 'w') {
        pressed = true;
    }
    if (event.key == 'a') {
        leftButtn.classList.add("buttnclicked");
        apressed = true;
    } else if (event.key == 'd') {
        rightButtn.classList.add("buttnclicked");
        dpressed = true;
    } else if (event.key == 'w') {
        upButtn.classList.add("buttnclicked");
        wpressed = true;
    } else if (event.key == '2') {
        twoButtn.classList.add("buttnclicked");
        processTwo();
    } else if (event.key == '1') {
        oneButtn.classList.add("buttnclicked");
        processOne();
    }
})
    
//reset on window unfocus   
document.addEventListener('blur', function (event) {
    leftButtn.classList.remove("buttnclicked");
    rightButtn.classList.remove("buttnclicked");
    upButtn.classList.remove("buttnclicked");
    twoButtn.classList.remove("buttnclicked");
    oneButtn.classList.remove("buttnclicked");
    apressed = false;
    dpressed = false;
    wpressed = false;
})

//process keyups ---
document.addEventListener('keyup', function (event) {
    if (event.key == 'a') {
        leftButtn.classList.remove("buttnclicked");
        apressed = false;
    } else if (event.key == 'd') {
        rightButtn.classList.remove("buttnclicked");
        dpressed = false;
    } else if (event.key == 'w') {
        upButtn.classList.remove("buttnclicked");
        wpressed = false;
    } else if (event.key == '1') {
        oneButtn.classList.remove("buttnclicked");
    } else if (event.key == '2') {
        twoButtn.classList.remove("buttnclicked");
    }
})
    
//stupid buttons (mouse and touchscreen) kill me pls    
rightButtn.addEventListener('mousedown', () => {pressed = true; dpressed = true;});
rightButtn.addEventListener('mouseup', () => { dpressed = false });
leftButtn.addEventListener('mousedown', () => {pressed = true; apressed = true;});
leftButtn.addEventListener('mouseup', () => {apressed = false});
upButtn.addEventListener('mousedown', () => {pressed = true; wpressed = true;});
upButtn.addEventListener('mouseup', () => {wpressed = false});
oneButtn.addEventListener('mousedown', () => {oneButtn.classList.add("buttnclicked")});
oneButtn.addEventListener('mousedown', processOne);
twoButtn.addEventListener('mousedown', processTwo);
rightButtn.addEventListener('mousedown', () => {rightButtn.classList.add("buttnclicked")});
rightButtn.addEventListener('mouseup', () => { rightButtn.classList.remove("buttnclicked") });
leftButtn.addEventListener('mousedown', () => {leftButtn.classList.add("buttnclicked")});
leftButtn.addEventListener('mouseup', () => { leftButtn.classList.remove("buttnclicked") });
upButtn.addEventListener('mousedown', () => {upButtn.classList.add("buttnclicked")});
upButtn.addEventListener('mouseup', () => { upButtn.classList.remove("buttnclicked") });
oneButtn.addEventListener('mouseup', () => {oneButtn.classList.remove("buttnclicked")});
twoButtn.addEventListener('mousedown', () => {twoButtn.classList.add("buttnclicked")});
twoButtn.addEventListener('mouseup', () => {twoButtn.classList.remove("buttnclicked")});
rightButtn.addEventListener('touchstart', () => {pressed = true; dpressed = true;});
rightButtn.addEventListener('touchend', () => { dpressed = false });
leftButtn.addEventListener('touchstart', () => {pressed = true; apressed = true;});
leftButtn.addEventListener('touchend', () => {apressed = false});
upButtn.addEventListener('touchstart', () => {pressed = true; wpressed = true;});
upButtn.addEventListener('touchend', () => {wpressed = false});
oneButtn.addEventListener('touchstart', () => {oneButtn.classList.add("buttnclicked")});
oneButtn.addEventListener('touchstart', processOne);
twoButtn.addEventListener('touchstart', processTwo);
rightButtn.addEventListener('touchstart', () => {rightButtn.classList.add("buttnclicked")});
rightButtn.addEventListener('touchend', () => { rightButtn.classList.remove("buttnclicked") });
leftButtn.addEventListener('touchstart', () => {leftButtn.classList.add("buttnclicked")});
leftButtn.addEventListener('touchend', () => { leftButtn.classList.remove("buttnclicked") });
upButtn.addEventListener('touchstart', () => {upButtn.classList.add("buttnclicked")});
upButtn.addEventListener('touchend', () => { upButtn.classList.remove("buttnclicked") });
oneButtn.addEventListener('touchend', () => {oneButtn.classList.remove("buttnclicked")});
twoButtn.addEventListener('touchstart', () => {twoButtn.classList.add("buttnclicked")});
twoButtn.addEventListener('touchend', () => {twoButtn.classList.remove("buttnclicked")});

//------------------------------------------------------------


//random vars idk why theyre here
let grassDrawn = false;
let onTelp = false;


function draw() {
    //translate ground level up/down
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

    //draw terminals (weird math lol idk how it works)
    let pts = (((lastGrass - 3) * grs.width * rt) - grs.width * rt) / 4;
    let tmlrt = Math.min((pts * 0.8) / tml.width, (canvas.height * 0.75 - grs.height*rt-10)/tml.height);

    for (let i = 0; i < 4; i++) {
        bctx.drawImage(tmls[i], (grs.width * rt) + pts * i + pts*0.1, (canvas.height * 3 / 4) - tml.height * tmlrt - drt.height * rt, tml.width * tmlrt, tml.height * tmlrt);
    }

    //translate top level up/down
    tctx.translate(0, tpY);
    tctx.clearRect(0, 0, canvas.width, canvas.height * 2);
    //draw clowds
    for (let i = -cld.width*trt/3; i < canvas.width; i += cld.width*2*trt/3) {
        tctx.drawImage(cld, i, canvas.height-cld.height*trt - player.height*prt/4, cld.width * trt, cld.height * trt);
    }
    for (let i = -cld.width*trt/2; i < canvas.width; i += cld.width*3) {
        tctx.drawImage(cld, i, canvas.height-cld.height*trt - player.height*prt/4, cld.width * trt, cld.height * trt);
    }

    //i copied this from the terminals cuz im l a zy
    let lnkrt = Math.min((pts * 0.8) / lnk.width, (canvas.height - cld.height*trt - player.height*prt/2-10) / lnk.height);
    for (let i = 0; i < 4; i++) {
        tctx.drawImage(lnks[i], (grs.width * rt) + pts * i + pts*0.1, canvas.height - lnk.height * lnkrt - cld.height*trt - player.height*prt/2, lnk.width * lnkrt, lnk.height * lnkrt);
    }
}


//main update -------------------------------------------------------------
function update() {
    //check if all images are loaded
    if (loaded >= 29) {

        telrt = (2 * grs.width * rt) / telp.width;
        
        //draw grass when it loads
        if (!grassDrawn) {
            prt = Math.min((canvas.width / 13) / grs.width, (canvas.height/5) / grs.height);
            playerX = canvas.width*2/3;
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

            ctx.drawImage(tlt, (canvas.width - tlt.width * trt) / 2, 50, tlt.width * trt, tlt.height * trt);
            
            grassDrawn = true;
        }
        
        //teleporter position
        let telX = lastGrass * grs.width * rt - grs.width * rt * 3;
        let telY = canvas.height - grs.height * rt - telp.height * telrt + prt * 2;
        
        //logic math stuff
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
        
        //calculate player pos
        uctx.clearRect(0, 0, canvas.width, canvas.height);
        playerX += dX;
        playerX = Math.max(playerX, 0);
        playerX = Math.min(playerX, canvas.width - player.width * prt);
        playerY = Math.min(canvas.height - grs.height * rt - player.height * prt, playerY + dY);
        if (level == 2) {
            playerX = Math.max(playerX, grs.width * rt);
            playerX = Math.min(playerX, (lastGrass-1) * grs.width * rt - player.width * prt);
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
        //-----------------------------
        

        //initial instructions
        if (!pressed) {
            uctx.beginPath();
            uctx.fillStyle = "#ffffffaa";
            uctx.rect(playerX-5, playerY - 20 - Math.max(3 * prt, 14), Math.max(3 * prt, 14)*9, Math.max(3 * prt, 14)+10);
            uctx.fill();
            uctx.fillStyle = "#000000";
            uctx.font = Math.max(3 * prt, 14) + 'px sans-serif';
            uctx.fillText('[WAD] to move', playerX, playerY - 20);
        }


        //draw text on teleporter ---------------------------------------------------------------------------------------
        if (!tpDown && !tpUp && playerX >= telX && playerX-5 <= telX + telp.width * telrt - player.width*prt) {
            onTelp = true;
            uctx.beginPath();
            uctx.fillStyle = "#ffffffaa";
            uctx.rect(telX, canvas.height - grs.height * rt - player.height * prt - 10 - Math.max(3 * prt, 14), Math.max(3 * prt, 14)*7, Math.max(3 * prt, 14)+10);
            uctx.fill();
            uctx.fillStyle = "#000000";
            uctx.font = Math.max(3 * prt, 14) + 'px sans-serif';
            if (level == 1) {
                uctx.beginPath();
                uctx.fillStyle = "#ffffffaa";
                uctx.rect(telX, canvas.height - grs.height * rt - player.height * prt - 50 - Math.max(3 * prt, 14), Math.max(3 * prt, 14)*7, Math.max(3 * prt, 14)+10);
                uctx.fill();
                uctx.fillStyle = "#000000";
                uctx.fillText('[1] go up', telX, canvas.height - grs.height * rt - player.height * prt - 50);
                uctx.fillText('[2] go down', telX, canvas.height - grs.height * rt - player.height * prt - 10);
            } else if (level == 2) {
                uctx.fillText('[1] go up', telX, canvas.height - grs.height * rt - player.height * prt - 10);
            } else if (level == 0) {
                uctx.fillText('[2] go down', telX, canvas.height - grs.height * rt - player.height * prt - 10);
            }
        } else {
            onTelp = false;
        }
        //--------------------------------------------------------------------------------------------------------------------


        //draw text when on terminals/balloons ----------------------------------------------------------
        curTml = -1;
        if (level == 2) {
            for (let i = 0; i < 4; i++) {
                let pts = (((lastGrass - 3) * grs.width * rt) - grs.width * rt) / 4;
                let tmlrt = Math.min((pts * 0.8) / tml.width, (canvas.height * 0.75 - grs.height * rt) / tml.height);
                let tmlpos = (grs.width * rt) + pts * i + pts * 0.1;
                if (playerX >= tmlpos - player.width * prt * 0.2 && playerX <= tmlpos + tml.width * tmlrt - player.width * prt * 0.8) {
                    uctx.beginPath();
                    uctx.fillStyle = "#ffffffaa";
                    uctx.rect(playerX, playerY -10 - Math.max(3 * prt, 14), Math.max(3 * prt, 14) * 7, Math.max(3 * prt, 14) + 10);
                    uctx.fill();
                    uctx.fillStyle = "#000000";
                    uctx.font = Math.max(3 * prt, 14) + 'px sans-serif';
                    uctx.fillText('[1] explore', playerX, playerY-10);
                    curTml = i;
                }
            }
        }

        if (level == 0) {
            for (let i = 0; i < 4; i++) {
                let pts = (((lastGrass - 3) * grs.width * rt) - grs.width * rt) / 4;
                let lnkrt = Math.min((pts * 0.8) / lnk.width, (canvas.height - grs.height * rt) / lnk.height);
                let lnkpos = (grs.width * rt) + pts * i + pts * 0.1;
                if (playerX >= lnkpos - player.width * prt * 0.2 && playerX <= lnkpos + lnk.width * lnkrt - player.width * prt * 0.8) {
                    uctx.beginPath();
                    uctx.fillStyle = "#ffffffaa";
                    uctx.rect(playerX, playerY -10 - Math.max(3 * prt, 14), Math.max(3 * prt, 14) * 7, Math.max(3 * prt, 14) + 10);
                    uctx.fill();
                    uctx.fillStyle = "#000000";
                    uctx.font = Math.max(3 * prt, 14) + 'px sans-serif';
                    uctx.fillText('[1] fly away!', playerX, playerY-10);
                    curTml = i;
                }
            }
        }

        //---------------------------------------------------------------------------------------


        //handle teleporting -----
        if (tpDown) {
            if (curY > goalY) {
                draw();

            } else {
                tpDown = false;
                tpY = 0;
                if (level == 0) level = 1;
                else level = 2;
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
                if (level == 1) level = 0;
                else level = 1;
                tpY = goalY - curY;
                draw();
            }
        }
        //------

    } else {
        //my only remaining debug thing idk why its here just to suffer
        console.log(loaded);
    }
}


//100fps :)
interval = setInterval(update, 10);
}
curTml = -1;
level = 1;
game();

//reset on resize cuz im too lazy to actually store stuff
window.addEventListener('resize', function () {
    clearInterval(interval);
    curTml = -1;
    level = 1;
    game();
});