module.exports = (function() {

  var context = {};
  var template = "base";
  var partials = {};

  init = function() {
    context = {};
    template = "base";
    partials = {};
  }

  generate = function(parent_context) {
    init();
    context = parent_context;

    if ((context.distro == "debian" && context.version > 7) ||
        (context.distro == "ubuntu" && context.version > 15.10)) {
      debian_install();
    }
    // Implement or complete these:
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

    template = require('./templates/install/' + template + '.html');
    return template.render(context, partials);
  }

  centos_install = function() {
    template = "centos";

    // from: https://digitz.org/blog/lets-encrypt-ssl-centos-7-setup/
    if (context.version < 7) {
      context.update_python = true;
    }
    // Include auto-install template as a subtemplate.
    partials.auto = require('./templates/install/auto.html');
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
    generate: generate
  };

})();