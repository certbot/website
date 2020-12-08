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
    anchor_params = parse_anchor(window.location.hash);
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
      server_longname: server_longname,
      wildcard: anchor_params.wildcard
    }
  };

  instruction_url = function(os, ws, wildcard) {
    return '/lets-encrypt/' + os + '-' + ws +
           (wildcard ? '#wildcard' : '');
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

  // Schema: "#os-ws", "#os-ws,list,of,flags", "#list,of,flags"
  parse_anchor = function(anchor) {
    var result = { os: null, ws: null };
    if (typeof anchor !== 'string') {
      return result;
    }
    var params = anchor.replace(/^#/, '').split(',');
    // First parameter is assumed to be "os-server" if it contains a '-'
    var i = 0;
    if (params.length > i && params[i].indexOf('-') !== -1) {
      var platform = params[i].split('-');
      result.os = platform[0];
      result.ws = platform[1];
      i++;
    }
    // Any remaining parameters are flags
    for (; i < params.length; i++) {
      if (params[i]) {
        result[params[i]] = true;
      }
    }
    return result;
  };

  // Users used to be able to link to an instruction set with an anchor link.
  // We can redirect them to a standalone page.
  redirect_anchor = function() {
    if (anchor_params && anchor_params.os && anchor_params.ws) {
      window.location.href = instruction_url(anchor_params.os, anchor_params.ws, 
                                             anchor_params.wildcard);
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
          window.location.href = instruction_url(input.os, input.webserver, input.wildcard);
          return;
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
    };

    // #wildcard pre-selects the "Wildcard tab"
    if (anchor_params.wildcard === true) {
      $('.tab.advanced', content_container).trigger('click');
    }  
  };

  return {
    init: init
  }
})();

$('document').ready(function() {
  InstructionWidget.init();
  $('.instructions .instruction-widget').ready(function() {
    var url = window.location.pathname.split('/');
    var selected = url[url.length - 1];
    if (!(selected === "")) {
      selected = selected.split('-');
      $('#os-select').val(selected[0]);
      $('#server-select').val(selected[1].replace(".html", ""));
      if (selected[0] == 'sharedhost') {
        $('.use-certbot').hide();
        $('.instructions-footer').hide();
      }
    }
  });
  $('.instructions').ready(function() {
    var docker = $('aside.docker-note');
    if (docker.length > 0) {
      $('.advanced li').addClass('hidden');
    }
  });
});
