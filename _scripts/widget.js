$ = require('jquery');
var instructions = require('./instructions');

// Json blobs
var inputs = require('./data/instruction-inputs.json');

// Templates
var template_select = require('./templates/widget.html');

InstructionWidget = {
  init: function() {
    this.render();
  },

  get_input: function() {
    // @TODO: store version as data attribute.
    var os_attrs = $("#os-select").val();
    if (os_attrs && os_attrs.split("-").length == 2) {
      var os_attrs = os_attrs.split("-");
      var distro = os_attrs[0];
      var version = os_attrs[1];
    }

    var webserver = $("#server-select").val();
    var use_case = $("#usecase-select").val();

    if (distro && version && webserver && use_case) {
      return {
        distro: distro,
        version: version,
        webserver: webserver,
        use_case: use_case
      }
    }
  },

  update_instructions: function() {
    var input = this.get_input();
    if (input) {
      var target = $(".instructions .content");
      target.html(instructions.generate(input));
    }
  },

  render: function() {
    var widget = $(".instruction-widget");
    var rendered = template_select.render({
      operating_systems: inputs.operating_systems,
      webservers: inputs.webservers,
      use_cases: inputs.use_cases
    });
    widget.html(rendered);
    widget.on("change", function() {
      InstructionWidget.update_instructions()
    });
  },
}

$('document').ready(function() {
  InstructionWidget.init();
});
