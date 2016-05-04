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

    // Debian Jessie backports.
    if (context.distro == "debian" && context.version == 8) {
      context.backports_flag = "-t jessie-backports";
    }

    // Set package based on webserver.
    // TODO: I don't think these packages are correct
    context.package == "certbot";
    if (context.webserver == "apache") {
      context.package = "certbot python-certbot-apache";
      context.base_command = "certbot";
    }
    else if (context.webserver == "nginx") {
      context.package = "certbot python-certbot-nginx";
      context.base_command = "certbot";
    }
  }

  gentoo_install = function() {
    template = "gentoo";

    context.package = "letsencrypt";
    context.base_command = "letsencrypt";
    context.base_package = "app-crypt/letsencrypt";
    if (context.webserver == "apache") {
      context.package = "letsencrypt-apache";
    }
    if (context.webserver == "nginx" && context.advanced) {
      context.package = "letsencrypt-nginx";
    }
  }

  arch_install = function() {
    template = "arch";
    context.package = "letsencrypt";
    context.base_command = "letsencrypt";
  }

  fedora_install = function() {
    template = "fedora";
    context.package = "letsencrypt";
    context.base_command = "letsencrypt";
  }
  // @todo: convert to template style
  bsd_install = function() {
    template = "bsd"

    if (context.distro == "freebsd"){
      context.portcommand = "py-letsencrypt";
      context.package = "pkg install py27-letsencrypt";
      context.base_command = "py27-letsencrypt";
    }
    if (context.distro == "opbsd"){
      context.portcommand = "letsencrypt/client";
      context.package = "pkg_add letsencrypt";
      context.base_command = "letsencrypt";
    }
  }

  auto_install = function() {
    template = "auto";
    context.base_command = "./path/to/certbot-auto";
  }

  return {
    html: html
  };

};
