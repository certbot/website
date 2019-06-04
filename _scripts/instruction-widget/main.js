var $ = require('jquery');
var Instructions = require('./instructions');
var inputs = require('../../_data/inputs.json');

/**
 * Controls a widget that allows users to get installation
 * and basic use instructions based on the operating system, webserver,
 * and use case.
 */
InstructionWidget = (function() {

  var select_container;
  var content_container;

  init = function() {
    redirect_anchor();
    select_container = $('.instruction-widget');
    content_container = $('.instructions.content');
    bind_ui_actions();
  }

  get_input = function() {
    var os_select = $('#os-select');
    var os = os_select.val()

    var distro = os_select.find('option:selected').data('distro');
    var version = os_select.find('option:selected').data('version');
    var distro_longname = os_select.find('option:selected').html();

    var server_select = $('#server-select');
    var webserver = server_select.val();
    var server_longname = server_select.find('option:selected').html();
    if (webserver == 'other') {
      server_longname = 'Unspecified Webserver';
    }

    return {
      os: os,
      distro: distro,
      version: version,
      webserver: webserver,
      distro_longname: distro_longname,
      server_longname: server_longname
    }
  };

  instruction_url = function(os, ws) {
    return '/lets-encrypt/' + os + '-' + ws;
  }

  jump = function(os, ws) {
    if(os && ws) {
      var url = instruction_url(os, ws);
      var state = {
        os: os,
        ws: ws
      }

      history.pushState(state, "", url);

      // Smooth scroll to instructions.
      var SCROLL_SPEED = 400;
      var target = $('.page-content');
      if (target.length) {
        $('html, body').animate({
          // Scroll a little further to account for sticky nav.
          scrollTop: target.offset().top - 60
        }, SCROLL_SPEED);
      }

      document.activeElement.blur();
    }
  };

  toggle_tabs = function(active_tab) {
    var tab = $(active_tab);

    if(!tab.hasClass("active")) {
      if(tab.prev().hasClass("active")) {
        tab.prev().removeClass("active");
      } else {
        tab.next().removeClass("active");
      }
      tab.addClass("active");
      $('.instruction-pane').toggle();
    }
  };

  // Users used to be able to link to an instruction set with an anchor link.
  // We can redirect them to a standalone page.
  redirect_anchor = function() {
    var params = window.location.hash.replace('#', '').split('-');
    if (params.length === 2) {
      window.location.href = instruction_url(params[0], params[1]);
    }
  }

  bind_ui_actions = function() {
    content_container.on('click', '.tab', function() {
      var active_tab = $(this);
      toggle_tabs(active_tab);
    });

    select_container.on('change', function() {
      var input = get_input();
      if ($('.instruction-widget').parent().hasClass('hero')) {
        if (input.os && input.webserver) {
          // We're on the homepage, redirect to instructions page
          window.location.href = instruction_url(input.os,input.webserver);
        }
      }
      Instructions().render(content_container, input);
      jump(input.os,input.webserver);
      document.activeElement.blur();
    });

    window.onpopstate = function(event) {
      if (event.state) {
        $('#os-select').val(event.state.os);
        $('#server-select').val(event.state.ws);
        Instructions().render(content_container, get_input());
      } else {
        location.reload();
      }
    }
  };

  return {
    init: init
  }
})();

$('document').ready(function() {
  InstructionWidget.init();
  $('.instructions .instruction-widget').ready(function() {
    var url = window.location.href.split('/');
    var selected = url[url.length - 1];
    if (!(selected === "")) {
      selected = selected.split('-');
      $('#os-select').val(selected[0]);
      $('#server-select').val(selected[1]);
    }
  });
});
