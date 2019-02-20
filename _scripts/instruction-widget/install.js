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
    context.dns_plugins = false;
    context.dns_package_prefix = "";
    context.jessie = false;  // Special jessie instructions for certbot-auto
    // Each case listed here should map to a template.
    // They don't necessarily need to map to distros.
    if (context.webserver == "plesk" || context.distro == "nonunix" ||
        context.distro == "sharedhost") {
        return '';
    }
    else if (context.distro == "debian" && context.version > 8) {
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
    } else if (context.distro == "devuan" && context.version > 1) {
      debian_install();
    } else if (context.distro == "opensuse") {
      opensuse_install();
    } else {
      if (context.distro == "debian" && context.version == 8) {
          context.jessie = true;
      }
      auto_install();
    }

    partials.auto = require(TEMPLATE_PATH + "commonauto.html");
    partials.header = require(TEMPLATE_PATH + "header.html");
    partials.dnsplugins = require(TEMPLATE_PATH + "dnsplugins.html");
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
      context.base_command = "/path/to/certbot-auto"
      context.epel_auto = (context.distro == "centos")
      context.packaged = false
    } else {
      context.base_command = "certbot"
      context.package = "certbot"
      context.packaged = true

      if (context.webserver == "apache") {
        context.package += " python2-certbot-apache";
      } else if (context.webserver == "nginx") {
        context.package += " python2-certbot-nginx";
      }
      context.dns_plugins = true;
      context.dns_package_prefix = "python2-certbot-dns"
    }
  }

  debian_install = function() {
    template = "debian";
    context.devuan = context.distro == "devuan"

    context.dns_plugins = true;
    context.dns_package_prefix = "python3-certbot-dns"

    context.base_command = "certbot";
    context.cron_included = true;
    context.package = "certbot";

    if (context.webserver == "apache") {
      context.package += " " + "python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " " + "python-certbot-nginx";
    }

    if (context.version == 9) {
      // Debian Stretch
      context.backports_flag = "-t stretch-backports";
    } else if (context.devuan && context.version == 2) {
      // Devuan ASCII
      context.backports_flag = "-t ascii-backports";
    }
  }

  ubuntu_install = function() {
    template = "ubuntu";

    context.package = "certbot"
    if (context.webserver == "apache") {
      context.package += " " + "python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " " + "python-certbot-nginx";
    }
    // Debian Jessie, Ubuntu 16.10, or newer
    context.base_command = "certbot";
    context.cron_included = true;
    context.dns_plugins = true;
    context.dns_package_prefix = "python3-certbot-dns"
  }

  gentoo_install = function() {
    template = "gentoo";

    context.package = "app-crypt/certbot";
    context.base_command = "certbot";
    context.base_package = "app-crypt/certbot";
    if (context.webserver == "apache") {
      context.package += " app-crypt/certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " app-crypt/certbot-nginx";
    }
  }

  arch_install = function() {
    template = "arch";
    context.package = "certbot"

    if (context.webserver == "apache") {
        context.package += " certbot-apache";
    } else if (context.webserver == "nginx") {
        context.package += " certbot-nginx";
    }

    context.base_command = "certbot";
    context.base_package = "certbot";
    context.dns_plugins = true;
    context.dns_package_prefix = "certbot-dns";
  }

  fedora_install = function() {
    template = "fedora";
    context.package = "certbot";
    context.base_command = "certbot";

    if (context.webserver == "apache") {
      context.package += " certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " certbot-nginx";
    }
    context.dns_plugins = true;
    context.dns_package_prefix = "python3-certbot-dns";
  }
  // @todo: convert to template style
  bsd_install = function() {
    template = "bsd"

    context.base_command = "certbot";
    if (context.distro == "freebsd"){
      context.dns_plugins = true;
      context.dns_package_prefix = "py27-certbot-dns";
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

  opensuse_install = function() {
    template = "opensuse";
    context.package = "certbot";
    context.base_command = "certbot";

    if (context.webserver == "apache") {
      context.package += " python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " python-certbot-nginx";
    }
    context.dns_plugins = true;
    context.dns_package_prefix = "python-certbot-dns";
  }

  auto_install = function() {
    template = "auto";
    context.base_command = "/path/to/certbot-auto";
  }

  return {
    html: html
  };

};
