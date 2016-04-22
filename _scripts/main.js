// js loaded on every page goes here.

(function() {

  var hamburger = document.getElementById('hamburger');

  hamburger.addEventListener('click',openMenu,false);

  function openMenu() {
    document.body.classList.toggle('active');
  }

})();