$( window ).resize(function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let cur = 1;
let loop = 0;

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
            $('#link' + cur).get(0).click();
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

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 400, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

$("#link1").mouseover(function () { cur = 1; loop = 2; arrow(); })
$("#link2").mouseover(function () { cur = 2; loop = 2; arrow(); })
$("#link3").mouseover(function () { cur = 3; loop = 2; arrow(); })
$("#link4").mouseover(function () { cur = 4; loop = 2; arrow(); })

setInterval(arrow, 150);