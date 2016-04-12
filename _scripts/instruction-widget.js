var $ = require('jquery');
var generator = require('./instruction-generator');

InstructionWidget = {
  init: function() {
    this.setup_select("os-select", Object.keys(generator.os_map))
    this.setup_select("server-select", generator.known_webservers)
    this.setup_select("usecase-select", generator.usecases)
    this.get_instructions()
  },

  get_selected_text: function(id) {
    return document.getElementById(id).selectedOptions[0].text;
  },

  get_instructions: function() {
    var text = this.get_selected_text("os-select");
    var selected_os = generator.os_map[text]

    input = {
      os : selected_os.os,
      os_version : selected_os.os_version,
      webserver : this.get_selected_text("server-select"),
      usecase : this.get_selected_text("usecase-select"),
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
