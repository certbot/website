$ = require('jquery');
var Instructions = require('./instructions');

// Json blobs
var inputs = require('./data/instruction-inputs.json');

// Templates
var template_select = require('./templates/widget.html');

InstructionWidget = {
  init: function() {
    this.render();
  },

  get_input: function() {
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
  },

  update_instructions: function() {
    var input = this.get_input();
    if (input) {
      var target = $(".instructions .content");
      target.html(Instructions().build(input));
    }
    $('.tab').on("click", function() {
      $('.instruction-pane').toggle();
    });
  },

  render: function() {
    var widget = $(".instruction-widget");
    var rendered = template_select.render({
      operating_systems: inputs.operating_systems,
      webservers: inputs.webservers,
    });
    widget.html(rendered);
    widget.on("change", function() {
      InstructionWidget.update_instructions();
    });
  },
}

$('document').ready(function() {
  InstructionWidget.init();
});
