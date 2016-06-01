/**
 * Generates installation instructions.
 *
 * @param {object} context: data needed to render the template, including:
 *    {string} context.distro: os distro input by user
 *    {string} context.version: os version input by user
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
  html = function() {

    context.above_4 = true;
    // Each case listed here should map to a template.
    // They don't necessarily need to map to distros.
    if (context.webserver == "plesk") {
        plugin_install();
    }
    else if ((context.distro == "debian" && context.version > 7) ||
        (context.distro == "ubuntu" && context.version > 15.10)) {
      debian_install();
    }
    // @todo: Implement or complete these.
    // else if (context.distro == "python"){
    //   return pip_install();
    // }
    else if (context.distro == "gentoo"){
      gentoo_install();
    }
    else if ((context.distro == "opbsd")||(context.distro =="freebsd")){
      bsd_install();
    }
    else if (context.distro == "arch"){
      context.certonly = "true";
      arch_install();
    }
    else if (context.distro == "fedora"){
      fedora_install();
    }
    else if (context.distro == "centos") {
      centos_install();
    } else {
      auto_install();
    }
    partials.warning = require(TEMPLATE_PATH + "warning.html");

    // Load and render the selected template.
    template = require(TEMPLATE_PATH + template + '.html');
    return template.render(context, partials);
  }

  /**
   * Install methods set a template as well as the
   * context and partials associated with that template.
   */

  plugin_install = function() {
      template = "plugin";
  }

  centos_install = function() {
    template = "centos";

    context.base_command = "./path/to/certbot-auto";
    // from: https://digitz.org/blog/lets-encrypt-ssl-centos-7-setup/
    if (context.version < 7) {
      context.update_python = true;
    }

    // Include auto-install instructions as a subtemplate.
    partials.auto = require(TEMPLATE_PATH + "auto.html");
  }

  debian_install = function() {
    template = "debian";

    if (context.distro == "ubuntu") {
      context.above_4 = false;
    }
    // Debian Jessie backports.
    if (context.distro == "debian" && context.version == 8) {
      context.backports_flag = "-t jessie-backports";
    }

    // Set package based on webserver.
    if (context.webserver == "apache") {
      context.package = "python-letsencrypt-apache";
    }
    if (context.os == "debiantesting") {
      context.base_command = "certbot";
      context.package = "certbot"
      if (context.webserver == "apache") {
        context.package = "python-certbot-apache";
      }
    }
  }

  gentoo_install = function() {
    template = "gentoo";

    context.package = "certbot";
    context.base_command = "certbot";
    context.base_package = "app-crypt/certbot";
    context.cbauto = false;
    if (context.webserver == "apache") {
      context.package = "certbot-apache";
    }
  }

  arch_install = function() {
    template = "arch";
    if (context.webserver == "apache" && context.advanced) {
        context.package = "letsencrypt-apache";
    } else if (context.webserver == "nginx" && context.advanced) {
        context.package = "letsencrypt-nginx";
    } else {
        context.package = "letsencrypt";
    }
    context.base_command = "letsencrypt";
    context.base_package = "letsencrypt";
  }

  fedora_install = function() {
    template = "fedora";
    context.package = "certbot";
    context.base_command = "certbot";
  }
  // @todo: convert to template style
  bsd_install = function() {
    template = "bsd"

    context.base_command = "letsencrypt";
    if (context.distro == "freebsd"){
      context.portcommand = "py-letsencrypt";
      context.package = "pkg install py27-letsencrypt";
    }
    if (context.distro == "opbsd"){
      context.portcommand = "letsencrypt/client";
      context.package = "pkg_add letsencrypt";
      context.base_command = "letsencrypt";
    }
  }

  auto_install = function() {
    template = "auto";
    context.cbauto = true
    context.base_command = "./path/to/certbot-auto";
  }

  return {
    html: html
  };

};
