// js loaded on every page goes here.

/**
 * Client-side code for the Certbot website.
 * Copyright (C) 2016  Electronic Frontier Foundation
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var Raven = require('raven-js');

(function (Raven) {
  'use strict';
  Raven.config('https://caa5edd9fc344ff69a3e0bd4c05a5a91@sentry.eff.org/20').install();
})(Raven);

(function() {
  [].forEach.call(document.querySelectorAll('.js-only'), function (el) {
    console.log("setting visibility");
    el.style.visibility = 'visible';
  });

  [].forEach.call(document.querySelectorAll('.no-js-only'), function (el) {
    el.style.visibility = 'hidden';
  });

  var hamburger = document.getElementById('hamburger');
  var close = document.getElementById('close');

  hamburger.addEventListener('click',toggleMenu,false);
  close.addEventListener('click',toggleMenu,false);

  function toggleMenu() {
    document.body.classList.toggle('active');
  }
})();
