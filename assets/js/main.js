$( window ).resize(function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let cur = 1;
let loop = 0;

var style = document.createElement("style");
var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

head.appendChild(style);

style.innerHTML="#home:after { height: calc(var(--vh, 1vh) * 100 - 0px); }";
// //WebKit Hack
// style.appendChild(document.createTextNode(""));
// //Add the <style> element to the page

function scrollTo() {
    console.log("hi");
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about").offset().top
    }, 2000);
}

$(window).scroll(function(){
    var scrollPos = $(document).scrollTop();
    style.innerHTML = "#home:after { height: calc(var(--vh, 1vh) * 100 - " + scrollPos + "px); }";
    // document.styleSheets[0].insertRule("#home:after { height: calc(var(--vh, 1vh) * 100 - " + scrollPos + "px); }", 0);
    // $("#home::after").css('height', 'calc(var(--vh, 1vh) * 100 - ' + scrollPos + 'px)');
    // console.log("#home::after").css('height');
});

$(document).keydown(function (e) {
    switch (e.which) {
        case 38:
            if (cur > 1) cur--;
            loop = 2;
            break;
        case 40:
            if (cur < 4) cur++;
            loop = 2;
            break;
        case 13:
            console.log(cur);
        default: return;
    }
    e.preventDefault();
});

function arrow() {
    if (loop % 5 == 0) {
        $(".arrow").each(function () {
            $(this).text("  ");
        });
        $(".rarrow").each(function () {
            $(this).text("  ");
        });
    } else if (loop % 5 == 2) {
        let cnt = 1;
        $(".arrow").each(function () {
            if (cnt == cur) {
                $(this).text("> ");
            } else {
                $(this).text("  ");
            }
            cnt++;
        });
        cnt = 1;
        $(".rarrow").each(function () {
            if (cnt == cur) {
                $(this).text("\u00A0<");
            } else {
                $(this).text("  ");
            }
            cnt++;
        });
    }
    loop = (loop + 1) % 5;
}

$("#link1").mouseover(function () { cur = 1; loop = 2; arrow(); })
$("#link2").mouseover(function () { cur = 2; loop = 2; arrow(); })
$("#link3").mouseover(function () { cur = 3; loop = 2; arrow(); })
$("#link4").mouseover(function () { cur = 4; loop = 2; arrow(); })

setInterval(arrow, 150);