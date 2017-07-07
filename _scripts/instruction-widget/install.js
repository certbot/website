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

    context.cron_included = false;
    // Each case listed here should map to a template.
    // They don't necessarily need to map to distros.
    if (context.webserver == "plesk" || context.distro == "nonunix" ||
        context.distro == "sharedhost") {
        return '';
    }
    else if (context.distro == "debian" && context.version > 7) {
      debian_install();
    }
    else if (context.distro == "ubuntu" && context.version >= 14.04){
        ubuntu_install();
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
      arch_install();
    }
    else if (context.distro == "fedora"){
      fedora_install();
    }
    else if (context.distro == "centos" || context.distro == "rhel") {
      centos_install();
    }
    else if (context.distro == "macos") {
      macos_install();
    } else {
      auto_install();
    }

    partials.auto = require(TEMPLATE_PATH + "commonauto.html");
    partials.header = require(TEMPLATE_PATH + "header.html");
    partials.warning = require(TEMPLATE_PATH + "warning.html");

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

    if (context.version < 7) {
      context.base_command = "./path/to/certbot-auto"
      context.epel_auto = (context.distro == "centos")
      context.packaged = false
    } else {
      context.base_command = "certbot"
      context.package = "certbot"
      context.packaged = true

      if (context.webserver == "apache") {
        context.package = "certbot-apache";
      } else if (context.webserver == "nginx") {
        context.package = "certbot-nginx";
      }
    }
  }

  debian_install = function() {
    template = "debian";
    context.devuan = context.distro == "devuan"

    // Debian Jessie
    context.base_command = "certbot";
    context.cron_included = true;
    context.package = "certbot";

    if (context.webserver == "apache") {
      context.package = "python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.certonly = true;
    }

    // Jessie backports.
    if ((context.devuan && context.version == 1) || context.version == 8) {
      context.backports_flag = "-t jessie-backports";
    }

  }

  ubuntu_install = function() {
    template = "ubuntu";

    context.package = "certbot"
    if (context.webserver == "apache") {
      context.package = "python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package = "python-certbot-nginx";
    }
    // Debian Jessie, Ubuntu 16.10, or newer
    context.base_command = "certbot";
    context.cron_included = true;
  }

  gentoo_install = function() {
    template = "gentoo";

    context.package = "certbot";
    context.base_command = "certbot";
    context.base_package = "app-crypt/certbot";
    context.cbauto = false;
    if (context.webserver == "apache") {
      context.package = "certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package = "certbot-nginx";
    }
  }

  arch_install = function() {
    template = "arch";
    context.package = "certbot"

    if (context.webserver == "apache") {
        context.package = "certbot-apache";
    } else if (context.webserver == "nginx") {
        context.package = "certbot-nginx";
    }

    context.base_command = "certbot";
    context.base_package = "certbot";
  }

  fedora_install = function() {
    template = "fedora";
    context.package = "certbot";
    context.base_command = "certbot";

    if (context.webserver == "apache") {
      context.package = "certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package = "certbot-nginx";
    }
  }
  // @todo: convert to template style
  bsd_install = function() {
    template = "bsd"

    context.base_command = "certbot";
    if (context.distro == "freebsd"){
      context.portcommand = "py-certbot";
      context.package = "pkg install py27-certbot";
    }
    if (context.distro == "opbsd"){
      if (context.version >= 6) {
          context.package = "pkg_add certbot";
          context.base_command = "certbot";
      } else {
          context.package = "pkg_add letsencrypt";
          context.base_command = "letsencrypt";
      }
    }

    // The Apache plugin isn't packaged for BSD yet
    if (context.webserver == "apache") {
      context.certonly = true;
    } else if (context.webserver == "nginx") {
      context.certonly = true;
    }
  }

  macos_install = function() {
    template = "macos";
    context.base_command = "certbot";
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
