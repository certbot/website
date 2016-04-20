/**
 * Generates installation instructions.
 *
 * @param {object} context: data needed to render the template, including:
 *    {string} context.distro: os distro input by user
 *    {string} context.version: is version input by user
 *    {string} context.webserver: webserver input by user
 *    {boolean} context.advanced: render advanced instructions if true
 */
module.exports = function(context) {
  var TEMPLATE_PATH = './templates/install/';

  // Name of the install template to use.
  var template = "";
  // Subtemplates to render inside the main template.
  // @see https://github.com/janl/mustache.js/#partials
  var partials = {};

  /**
   * Returns an html string of install instructions.
   */
  build = function() {

    // Each case listed here should map to a template.
    // They don't necessarily need to map to distros.
    if ((context.distro == "debian" && context.version > 7) ||
        (context.distro == "ubuntu" && context.version > 15.10)) {
      debian_install();
    }
    // @todo: Implement or complete these.
    // else if (context.distro == "python"){
    //   return pip_install();
    // }
    // else if (context.distro == "gentoo"){
    //   return gentoo_install();
    // }
    // else if (context.distro == "bsd"){
    //   return bsd_install();
    // }
    else if (context.distro == "centos") {
      centos_install();
    } else {
      auto_install();
    }

    // Load and render the selected template.
    template = require(TEMPLATE_PATH + template + '.html');
    return template.render(context, partials);
  }

  /**
   * Install methods set a template as well as the
   * context and partials associated with that template.
   */
  centos_install = function() {
    template = "centos";

    // from: https://digitz.org/blog/lets-encrypt-ssl-centos-7-setup/
    if (context.version < 7) {
      context.update_python = true;
    }

    // Include auto-install instructions as a subtemplate.
    partials.auto = require(TEMPLATE_PATH + "auto.html");
  }

  debian_install = function() {
    template = "debian";

    // Debian Jessie backports.
    if (context.distro == "debian" && context.version == 8) {
      context.backports_flag = "-t jessie-backports";
    }

    // Set package based on webserver.
    context.package == "certbot";
    if (context.webserver == "apache") {
      context.package = "certbot python-certbot-apache";
    }
    else if (context.webserver == "nginx") {
      context.package = "certbot python-certbot-nginx";
    }
  }

  // @todo: convert to template style
  gentoo_install = function() {
    context.package = "certbot";
    if (context.webserver == "apache") {
      context.package = "certbot-apache";
      context.base_command = "certbot-apache";
    }
    return iprint("emerge " + context.package);
  }

  // @todo: convert to template style
  bsd_install = function() {
    return iprint("pksg install py27-letsencrypt");
  }

  auto_install = function() {
    template = "auto";
    context.base_command = "certbot-auto";
  }

  return {
    build: build
  };

};