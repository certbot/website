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
var $ = require('jquery');
var dt = require('datatables.net');

(function (Raven) {
  'use strict';
  Raven.config('https://caa5edd9fc344ff69a3e0bd4c05a5a91@sentry.eff.org/20').install();
})(Raven);

(function() {
  [].forEach.call(document.querySelectorAll('.js-only'), function (el) {
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

$(document).ready(function() {
  $('.glossary-term.no-js').remove();
  $('.glossary-term.js-only').removeClass('disabled');
  // Tooltips
  $('.glossary-link').click(function() {
    var glossDiv = $(this).parents('.glossary-term');
    $(glossDiv).children('.tooltip').addClass('open');
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.glossary-term').length)
      $('.tooltip').removeClass('open');
  });
  $(document).on('keydown', function(e) {
    if (e.which == 27) {
      $('.tooltip').removeClass('open');
    }
  });
  $('.close-tooltip').on('click', function(e) {
    $('.tooltip').removeClass('open');
  });
  var hosting_table = $('#hosting-providers').DataTable({
    "paging": false,
    "info": false,
    "scrollX": true,
    "responsive": true
  });
  hosting_table.column('.category').visible(false);
  $('#full-https').on('click', function() {
    hosting_table.columns().search('').column('.category').search('full').draw();
    $('.tab-header').removeClass('visible');
    $('#full-header').addClass('visible');

  });
  $('#partial-https').on('click', function() {
    hosting_table.columns().search('').column('.category').search('partial').draw();
    $('.tab-header').removeClass('visible');
    $('#partial-header').addClass('visible');
  });
  $('#no-https').on('click', function() {
    hosting_table.columns().search('').column('.category').search('no').draw();
    $('.tab-header').removeClass('visible');
    $('#no-header').addClass('visible');
  });
  $('#full-https').click();
});
