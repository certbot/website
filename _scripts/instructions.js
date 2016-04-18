// third-party modules
var $ = require('jquery');

// custom modules
var Install = require("./install.js");
var GetStarted = require("./get-started.js");

module.exports = function() {

    context = {
        base_command: "certbot",
        package_manager: "",
        package: "certbot",
        install_flags: "",
        plugin: ""
    };

    generate = function(input) {
        // Add user inputs to the context:
        // distro, version, webserver, and use case.
        $.extend(context, input);

        install_html = Install().generate(context);
        started_html = GetStarted().generate(context);
        return install_html + started_html;
    };

    return {
        generate: generate
    };
};
