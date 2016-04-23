var $ = require('jquery');

var Install = require("./install.js");
var GetStarted = require("./get-started.js");

/**
 * Generates Certbot installation and use instructions
 * for both automated and advanced use cases, and
 * renders them within a tabbed layout.
 */
module.exports = function() {

  // Set some defaults.
  var context = {
    base_command: "certbot",
    package: "certbot",
  };

  var partials = {};

  html = function(input) {
    if ((input.distro == null) ||
        (input.version == null) ||
        (input.webserver == null)) {
      return "To get instructions for certbot, choose your webserver " +
        "and server operating system from the dropdown menus above.";
    } else {
      // Add user inputs to the context:
      // distro, version and webserver.
      $.extend(context, input);
      // Allow templates to render instruction blocks based
      // on a user's webserver.
      context[input.webserver] = true;
    }

    // Generate automated and advanced instruction sets.
    $.each(['automated', 'advanced'], function(i, use_case) {
      context.advanced = use_case == 'advanced';
      partials[use_case + '_install'] = Install(context).html();
      partials[use_case + '_get_started'] = GetStarted(context).html();
    });

    var template = require("./templates/instructions.html")
    var html = template.render(context, partials);
    return html;
  };

  render = function(input) {
    var content = html(input);
    if (content != null) {
      var target = $(".instructions.content");
      target.html(content);
    }
  }

  return {
    render: render
  };
};
