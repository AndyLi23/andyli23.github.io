let canvas = document.getElementById('main');
let ctx = canvas.getContext('2d');


function draw() {
    let url = "/assets/img/background.png";
    let bgd = new Image();
    bgd.src = url;
    bgd.addEventListener("load", function () {
        ctx.drawImage(bgd, 0, 0, canvas.width, canvas.height);
    })
}