var $ = require('jquery');
var _ = require('lodash');
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

  get_partials = function(input) {
    if ((input.distro == null) ||
        (input.version == null) ||
        (input.webserver == null)) {
      return "To get instructions for certbot, choose your webserver " +
        "and server operating system from the dropdown menus above.";
    } else {
      // Add user inputs to the context:
      // distro, version and webserver.
      _.extend(context, input);
      // Allow templates to render instruction blocks based
      // on a user's webserver.
      context[input.webserver] = true;
    }

    // Generate automated and advanced instruction sets.
    var partials = {};
    _.each(['automated', 'advanced'], function(use_case) {
      context.advanced = use_case == 'advanced';
      partials[use_case + '_install'] = Install(context).html();
      partials[use_case + '_get_started'] = GetStarted(context).html();
    });

    return partials;
  };

  html = function(input) {
    var partials = get_partials(input);
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
    get_partials: get_partials,
    render: render
  };
};
