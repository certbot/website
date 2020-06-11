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
    base_package: "certbot",
    package: "certbot",
  };

  get_partials = function(input) {
    // Add user inputs to the context: distro, version and webserver.
    _.extend(context, input);
    // Allow templates to render instruction blocks based on a user's webserver.
    context[input.webserver] = true;

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
    if ((input.distro == null) ||
        (input.version == null) ||
        (input.webserver == null)) {
      return 'To get instructions for Certbot, choose your server software ' +
        'and the system it is running on from the dropdown menus above.';
    }
    var partials = get_partials(input);
    var template = require("./templates/instructions.html")
    var html = template.render(context, partials);
    return html;
  };

  render = function(container, input) {
    console.log(input);
    $('#os-select').val(input.os);
    $('#server-select').val(input.webserver);
    var content = html(input);
    if (content != null) {
      container.html(content);
    }
  }

  return {
    html: html,
    render: render
  };
};
