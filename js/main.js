/* Ondrela — us-ondrela.vercel.app */
(function () {
  "use strict";

  /* Section menu on small screens */
  var btn = document.querySelector(".menu-btn");
  var list = document.getElementById("menu-list");
  if (btn && list) {
    btn.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        list.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && list.classList.contains("open")) {
        list.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  /* Order rail: rises once the hero buttons scroll off, and retracts over
     the pricing section so it never covers it. */
  var rail = document.querySelector(".rail");
  if (rail && "IntersectionObserver" in window) {
    var gone = false;
    var atPrice = false;
    function refresh() {
      rail.classList.toggle("show", gone && !atPrice);
    }
    var heroActs = document.getElementById("hero-acts");
    if (heroActs) {
      new IntersectionObserver(
        function (entries) {
          gone =
            !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
          refresh();
        },
        { threshold: 0 }
      ).observe(heroActs);
    }
    var price = document.getElementById("price");
    if (price) {
      new IntersectionObserver(
        function (entries) {
          atPrice = entries[0].isIntersecting;
          refresh();
        },
        { threshold: 0 }
      ).observe(price);
    }
  }
})();
