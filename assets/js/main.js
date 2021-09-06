let level = 1;

//setup
let canvas = document.getElementById('main');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.imageSmoothingEnabled = false;



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



//draw grass
if (level == 1) {
    let grs = new Image();
    grs.src = "/assets/img/grass.png";

    let rt = (canvas.height / 6) / grs.height;

    grs.addEventListener("load", function () {
        for (let i = 0; i < canvas.width; i += grs.width * rt) {
            ctx.drawImage(grs, i, canvas.height - grs.height * rt, grs.width * rt, grs.height * rt);
        }
    })

}

function update() {

}


setInterval(update, 10);

/*window.addEventListener('resize', function(event){
    draw();
});*/