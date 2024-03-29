$( window ).resize(function() {
    let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  reload();
});

function reload() {
  var rect = document.getElementById("projects").getBoundingClientRect()
  var rect2 = document.getElementById("stars").getBoundingClientRect()

  if (rect.bottom <= window.innerHeight) {
    $("#stars").css({ "transform": "translateY(" + (rect.height - rect2.height) + "px)", "position": "absolute", "top": "", "bottom": ""});
  } else if (rect.y <= 0) {
    $("#stars").css({ "transform": "", "position": "fixed", "top": "0", "bottom": "0" });
  } else {
    $("#stars").css({ "transform": "translateY(" + 0 + "px)", "position": "absolute", "top": "", "bottom": ""});
  }
}



// reload()

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


$(window).scroll(function () {  
  var scrollTop = $(window).scrollTop();
  var opacity = Math.min(1, scrollTop / window.innerHeight);
  var color = "rgba(1, 0, 35, " + opacity + ")";
  $(".navbar").css({ "background": color });
  reload();
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

let dropdowns = document.querySelectorAll('.ex-list');

function show(dropdownItem) {
  let dropdownPg = dropdownItem.querySelector('p');

  dropdownPg.style.setProperty('--openHeight', dropdownPg.scrollHeight + 'px');

  dropdownPg.classList.add('show');
  dropdownPg.classList.remove('hide');
}

function hide(dropdownItem) {
  let dropdownPg = dropdownItem.querySelector('p');

  dropdownPg.style.setProperty('--openHeight', dropdownPg.scrollHeight + 'px');

  dropdownPg.classList.remove('show');
  dropdownPg.classList.add('hide');
}

function toggle(dropdownItem, e) {
  let dropdownPg = dropdownItem.querySelector('p');

  dropdownPg.style.setProperty('--openHeight', dropdownPg.scrollHeight + 'px');

  dropdownPg.classList.toggle('show');
  dropdownPg.classList.toggle('hide');
  if (!(e.target.tagName === 'A')) {
    e.preventDefault();
  }
}

dropdowns.forEach(dropdownItem => {
  dropdownItem.addEventListener('mouseover', (e) => show(dropdownItem));
  dropdownItem.addEventListener('mouseout', (e) => hide(dropdownItem));
  dropdownItem.addEventListener('touchend', (e) => toggle(dropdownItem, e));
  dropdownItem.addEventListener('mousedown', (e) => toggle(dropdownItem, e));
});