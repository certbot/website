module.exports = function() {
    generate = function() {
        return "";
    };

    print_getting_started_instructions = function() {
        if (input.use_case == "automated")
            print_automated_getting_started()
        else if (input.use_case == "manual")
            print_manual_getting_started()
        else if (input.use_case == "developer")
            print_developer_getting_started()
    }

    print_automated_getting_started = function() {
        if (input.webserver == "apache") {
            return iprint(strings.apache_automated);
        } else if (input.webserver == "haproxy" || input.webserver == "plesk") {
            iprint(strings.certonly_automated);
            context.plugin = input.webserver;
        } else {
            return iprint(strings.certonly_automated);
        }
    }

    print_manual_getting_started = function() {
        return iprint(strings.manual);
    }

    print_developer_getting_started = function() {
        if (input.webserver == "apache")
            return iprint(strings.dev_apache)
        else if (input.webserver == "nginx")
            return iprint(strings.dev)
        else
            return iprint(strings.dev)
    }

    return {
        generate: generate
    };
};