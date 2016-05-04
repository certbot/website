module.exports = function(context) {

    var TEMPLATE_PATH = './templates/getting-started/';
    var template = "";
    var partials = {};

    html = function() {
        if (context.webserver == "apache") {
            apache_getting_started();
        } else if (context.webserver == "haproxy") {
            haproxy_getting_started();
        } else if (context.webserver == "plesk") {
            plesk_getting_started();
        } else {
            certonly_getting_started();
        }
        template = require(TEMPLATE_PATH + template + '.html');
        return template.render(context, partials);
    }

    apache_getting_started = function() {
        if (context.apache_unsupported) {
            template = "apache-unsupported";
            partials.certonly = require(TEMPLATE_PATH + "certonly.html");
        } else {
            template = "apache";
        }
    }

    haproxy_getting_started = function() {
        template = "haproxy";
        partials.certonly = require(TEMPLATE_PATH + "certonly.html");
    }

    plesk_getting_started = function() {
        template = "plesk";
    }

    certonly_getting_started = function() {
        template = "certonly";
    }

    return {
        html: html
    };
};
