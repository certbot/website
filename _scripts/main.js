// js loaded on every page goes here.

(function() {

  var hamburger = document.getElementById('hamburger');
  var close = document.getElementById('close');

  hamburger.addEventListener('click',toggleMenu,false);
  close.addEventListener('click',toggleMenu,false);

  function toggleMenu() {
    document.body.classList.toggle('active');
  }

})();