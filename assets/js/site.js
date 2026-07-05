document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".nm-burger");
  var drawer = document.querySelector(".nm-drawer");
  if (!burger || !drawer) return;

  burger.addEventListener("click", function () {
    drawer.classList.toggle("open");
  });

  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      drawer.classList.remove("open");
    });
  });
});
