module.exports = function(context) {

    var TEMPLATE_PATH = './templates/getting-started/';
    var template = "";
    var partials = {};

    html = function() {
        partials.certonly = require(TEMPLATE_PATH + "certonly.html");
        partials.renewal = require(TEMPLATE_PATH + "renewal.html");
        context.imperative = "you'll have to";
        if (!context.above_4) {
            webroot_getting_started();
        } else if (context.certonly) {
            certonly_getting_started();
        } else if (context.webserver == "apache") {
            apache_getting_started();
        } else if (context.webserver == "haproxy") {
            haproxy_getting_started();
        } else if (context.webserver == "plesk") {
            plesk_getting_started();
        } else if (context.webserver == "nginx") {
            nginx_getting_started();
        } else {
            certonly_getting_started();
        }
        template = require(TEMPLATE_PATH + template + '.html');
        return template.render(context, partials);
    }

    webroot_getting_started = function() {
        template = "webroot";
    }

    apache_getting_started = function() {
        if (context.apache_unsupported) {
            template = "apache-unsupported";
        } else {
            template = "apache";
        }
    }

    haproxy_getting_started = function() {
        context.officially = "officially ";
        context.imperative = "you should probably"
        template = "haproxy";
    }

    plesk_getting_started = function() {
        template = "plesk";
    }

    certonly_getting_started = function() {
        template = "certonly";
    }

    nginx_getting_started = function() {
        context.imperative = "you should probably"
        template = "nginx";
    }

    return {
        html: html
    };
};
