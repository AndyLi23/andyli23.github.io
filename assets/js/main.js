$( window ).resize(function() {
    let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  reload();
});

function reload() {
  // let ph = $("#projects").height();
  // console.log(ph);
  // $("#stars").css(
  //   {
  //     "height": ph + "px"
  //   }
  // )
}

// reload()

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
  var opacity = Math.min(1, scrollTop / window.innerHeight);
  var color = "rgba(1, 0, 35, " + opacity + ")";
  $(".navbar").css({ "background": color });
  
});


$(".logo").click(
  function () {
    $('html, body').animate(
      {
        scrollTop: $("#home").offset().top,
      },
      600,
      "easeInOutQuint",
      function () {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = "home";
      }
    );
  }
)


$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        600,
        "easeInOutQuint",
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

$(document).ready(function() {
  reload();
  AOS.init({once: true});
});