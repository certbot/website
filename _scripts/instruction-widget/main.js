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
    Instructions().render(content_container, get_input());
  }

  get_input = function() {
    var os_select = $('#os-select');
    var os = os_select.val()

    var server_select = $('#server-select');

    var distro = os_select.find('option:selected').data('distro');
    var version = os_select.find('option:selected').data('version');

    var distro_longname = os_select.find('option:selected').html();
    var server_longname = server_select.find('option:selected').html();

    var webserver = $("#server-select").val();

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
    var query = window.location.search.substring(1);
    var params = parse_query_string(query);
    if (params.server != null && params.os != null) {
      $('#server-select').val(params.server);
      $('#os-select').val(params.os);
    }
  }

  parse_query_string = function(query) {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function(s) {
          return decodeURIComponent(s.replace(pl, " "));
        };

    var urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
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
      var url = '?' + 'os=' + os + '&' + 'server=' + ws + '#' + os + '-' + ws;
      location.href = url;
      history.replaceState(null,null,url);
      document.activeElement.blur();
    }
  };

  toggle_tabs = function(active_tab) {
    $('.tab').removeClass('active');
    $(active_tab).addClass("active");
    $('.instruction-pane').toggle();

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
  };

  return {
    init: init
  }
})();

$('document').ready(function() {
  InstructionWidget.init();
});