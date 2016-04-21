var $ = require('jquery');
var Instructions = require('./instructions');
var inputs = require('./data/instruction-inputs.json');

/**
 * Renders and controls a widget that allows users to get installation
 * and basic use instructions based on the operating system, webserver,
 * and use case.
 */
InstructionWidget = (function() {

  var container;

  init = function() {
    container = $('.instruction-widget');
    render();
    bind_ui_actions();
  }

  get_input = function() {
    // OS version is stored as a data attribute on the select option
    var os_select = $("#os-select");
    var distro = os_select.val();
    var version = os_select.find('option:selected').data('version');

    var webserver = $("#server-select").val();

    if (distro && version && webserver) {
      return {
        distro: distro,
        version: version,
        webserver: webserver,
      }
    }
  };

  render = function() {
    var template = require('./templates/widget.html');
    var rendered = template.render({
      operating_systems: inputs.operating_systems,
      webservers: inputs.webservers
    });
    container.html(rendered);
  };

  toggle_tabs = function() {
    $('.instruction-pane').toggle();
  };

  bind_ui_actions = function() {
    container.on("click", ".tab", function() {
      toggle_tabs();
    });

    container.on("change", function() {
      Instructions().render(get_input());
    });
  };

  return {
    init: init
  }
})();

$('document').ready(function() {
  InstructionWidget.init();
});
