// third-party modules
var $ = require('jquery');

// custom modules
var install = require("./install.js");
var started = require("./get-started.js");

module.exports = (function() {

    var context = {};

    initialize_context = function(input) {
        context = {
            base_command: "certbot",
            package_manager: "",
            package: "certbot",
            install_flags: "",
            plugin: ""
        };

        // Add user inputs to the context:
        // distro, version, webserver, and use case.
        $.extend(context, input);
    };

    generate = function(input) {
        initialize_context(input);
        install_html = install.generate(context);
        started_html = started.generate(context);
        return install_html + started_html;
    };

    return {
        generate: generate
    };
})();
