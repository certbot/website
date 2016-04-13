var $ = require('jquery');
var _ = require('lodash');
var generator = require('./instruction-generator');
var inputs = require('./data/instruction-inputs.json')

InstructionWidget = {
  init: function() {
    this.setup_select("os-select", _.keys(inputs.operating_systems))
    this.setup_select("server-select", _.keys(inputs.webservers))
    this.setup_select("usecase-select", _.keys(inputs.use_cases))
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

    try {
      generator.print_help()
    }
    catch(err) {
      out = "Error generating requested help"
    }

    document.getElementById("instructions").innerHTML = out
    out = ""
  },

  setup_select: function(select_id, options) {
    var select = document.getElementById(select_id)
    options.forEach(function (item, idx, arr) {
      select.options.add(new Option(item))
    })
    select.onchange = function() {
      InstructionWidget.get_instructions()
    }
  }
}

$('document').ready(function() {
  InstructionWidget.init();
});
