// third-party modules
var $ = require('jquery');

// custom modules
var Install = require("./install.js");
var GetStarted = require("./get-started.js");

module.exports = function() {

  // Set some defaults.
  var context = {
    base_command: "certbot",
    package: "certbot",
  };

  generate = function(input) {
    // Add user inputs to the context:
    // distro, version, webserver, and use case.
    $.extend(context, input);

    context.advanced = false;
    var automated_install_html = Install(context).generate();
    var automated_started_html = GetStarted(context).generate();

    context.advanced = true;
    var advanced_install_html = Install(context).generate();
    var advanced_started_html = GetStarted(context).generate();

    // @todo: render instructions into a tabbed layout here.
    var template = require("./templates/instructions.html")
    var html = template.render({
      automated_install: automated_install_html,
      automated_get_started: automated_started_html,
      advanced_install: advanced_install_html,
      advanced_get_started: advanced_started_html
    });
    return html;
  };

  return {
    generate: generate
  };
};
