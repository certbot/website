var $ = require('jquery');
var _ = require('lodash');
var generator = require('./instruction-generator');
var inputs = require('./data/instruction-inputs.json');

// Templates
var template_select = require('./templates/instruction-select.html');

InstructionWidget = {
  init: function() {
    this.render_select();
    this.get_instructions()
  },

  get_selected_text: function(id) {
    return document.getElementById(id).selectedOptions[0].text;
  },

  get_instructions: function() {
    var text = this.get_selected_text("os-select");
    var selected_os = inputs.operating_systems[text]

    input = {
      os: selected_os.distro,
      os_version: selected_os.version,
      webserver: this.get_selected_text("server-select"),
      usecase: this.get_selected_text("usecase-select"),
    }

    var out = "";
    try {
      out = generator.print_help();
    }
    catch(err) {
      out = "Error generating requested help"
    }

    document.getElementById("instructions").innerHTML = out
  },

  render_select: function(select_id, options) {
    var widget = $(".instruction-widget");
    var rendered = template_select({
      operating_systems: _.keys(inputs.operating_systems),
      webservers: _.keys(inputs.webservers),
      use_cases: _.keys(inputs.use_cases)
    });
    widget.html(rendered);
    widget.onchange = function() {
      InstructionWidget.get_instructions()
    }
  }
}

$('document').ready(function() {
  InstructionWidget.init();
});
