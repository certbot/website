var $ = require('jquery');
var Instructions = require('./instructions');
var inputs = require('./data/inputs.json');

/**
 * Renders and controls a widget that allows users to get installation
 * and basic use instructions based on the operating system, webserver,
 * and use case.
 */
InstructionWidget = (function() {

  var select_container;
  var content_container;

  init = function() {
    select_container = $('.instruction-widget');
    content_container = $('.instructions.content');
    render();
    bind_ui_actions();
    set_state_from_url();
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

  set_state_from_url = function() {
    var hash = window.location.hash;
    params = hash.replace('#', '').split('-');
    if (params.length == 2) {
      $('#os-select').val(params[0]);
      $('#server-select').val(params[1]);
    } else {
      $('#os-select').val("");
      $('#server-select').val("");
    }
    Instructions().render(content_container, get_input());
  }

  render = function() {
    var template = require('./templates/widget.html');
    var rendered = template.render({
      operating_systems: inputs.operating_systems,
      webservers: inputs.webservers
    });
    select_container.html(rendered);
  };

  jump = function(os,ws) {
    if(os && ws) {
      var url = '#' + os + '-' + ws;
      location.href = url;
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

  bind_ui_actions = function() {
    content_container.on('click', '.tab', function() {
      var active_tab = $(this);
      toggle_tabs(active_tab);
    });

    select_container.on('change', function() {
      var input = get_input();
      Instructions().render(content_container, input);
      jump(input.os,input.webserver);
      document.activeElement.blur();
    });

    window.addEventListener("hashchange", set_state_from_url, false);
  };

  return {
    init: init
  }
})();

$('document').ready(function() {
  InstructionWidget.init();
});