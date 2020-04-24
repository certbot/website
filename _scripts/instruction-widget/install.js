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
    context.python_name = "python";
    // Each case listed here should map to a template.
    // They don't necessarily need to map to distros.
    if (context.webserver == "plesk" || context.distro == "windows" ||
        context.distro == "sharedhost") {
        return '';
    }
    else if (context.distro == "snap") {
      snap_install();
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
    partials.installcertbot = require(TEMPLATE_PATH + "installcertbot.html");
    partials.dnsplugins = require(TEMPLATE_PATH + "dnsplugins.html");
    partials.dnspluginssetup = require(TEMPLATE_PATH + "dnspluginssetup.html");

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

    // Certbot only has packages available for RHEL 7 based systems.
    if (context.version != 7) {
      context.base_command = "/usr/local/bin/certbot-auto";
      // RHEL/CentOS 6 32 bits distros are not supported by certbot-auto.
      if (context.version == 6) {
        context.deprecated_32bits = true
      } else {
        context.deprecated_32bits = false
        context.python_name = "python3";
      }
      context.need_epel = false;
      context.packaged = false;
    } else {
      context.need_epel = true;
      context.base_command = "certbot";
      context.install_command = "sudo yum install";
      context.package = "certbot";
      context.packaged = true;

      if (context.webserver == "apache") {
        context.package += " python2-certbot-apache";
      } else if (context.webserver == "nginx") {
        context.package += " python2-certbot-nginx";
      }
      context.dns_plugins = true;
      context.dns_package_prefix = "python2-certbot-dns";
    }
  }

  debian_install = function() {
    template = "debian";
    context.devuan = context.distro == "devuan";

    context.dns_plugins = true;
    context.dns_package_prefix = "python3-certbot-dns";

    context.base_command = "certbot";
    context.cron_included = true;
    context.package = "certbot";
    context.install_command = "sudo apt-get install";

    if (context.webserver == "apache") {
      context.package += " " + "python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " " + "python-certbot-nginx";
    }
  }

  ubuntu_install = function() {
    template = "ubuntu";

    context.ppa = context.version < 19.10;
    context.package = "certbot";
    context.install_command = "sudo apt-get install";
    if (context.webserver == "apache") {
      context.package += " " + "python3-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " " + "python3-certbot-nginx";
    }
    // Debian Jessie, Ubuntu 16.10, or newer
    context.base_command = "certbot";
    context.cron_included = true;
    context.dns_plugins = true;
    context.dns_package_prefix = "python3-certbot-dns";
  }

  gentoo_install = function() {
    template = "gentoo";

    context.package = "app-crypt/certbot";
    context.base_command = "certbot";
    context.base_package = "app-crypt/certbot";
    context.install_command = "sudo emerge -av";
    if (context.webserver == "apache") {
      context.package += " app-crypt/certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " app-crypt/certbot-nginx";
    }
  }

  arch_install = function() {
    template = "arch";
    context.package = "certbot";

    if (context.webserver == "apache") {
        context.package += " certbot-apache";
    } else if (context.webserver == "nginx") {
        context.package += " certbot-nginx";
    }

    context.base_command = "certbot";
    context.base_package = "certbot";
    context.install_command = "sudo pacman -S";
    context.dns_plugins = true;
    context.dns_package_prefix = "certbot-dns";
  }

  fedora_install = function() {
    template = "fedora";
    context.package = "certbot";
    context.base_command = "certbot";
    context.install_command = "sudo dnf install";

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
    template = "bsd";

    context.base_command = "certbot";
    if (context.distro == "freebsd"){
      context.dns_plugins = true;
      context.dns_package_prefix = "py36-certbot-dns";
      context.portcommand = "py-certbot";
      context.package = "py36-certbot";
      context.install_command = "pkg install";
    }
    if (context.distro == "opbsd"){
      context.install_command = "pkg_add";
      context.package = "certbot";
      context.base_command = "certbot";
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
    context.install_command = "brew install";
  }

  opensuse_install = function() {
    template = "opensuse";
    context.package = "certbot";
    context.base_command = "certbot";
    context.install_command = "sudo zypper install";

    if (context.webserver == "apache") {
      context.package += " python-certbot-apache";
    } else if (context.webserver == "nginx") {
      context.package += " python-certbot-nginx";
    }
    context.dns_plugins = true;
    context.dns_package_prefix = "python-certbot-dns";
  }

  snap_install = function() {
    template = "snap";
    context.base_command = "certbot";
    context.cron_included = true;
    context.install_command = "sudo snap install --beta --classic";
    context.package = "certbot";
  }

  auto_install = function() {
    template = "auto";
    context.base_command = "/usr/local/bin/certbot-auto";
  }

  return {
    html: html
  };

};
