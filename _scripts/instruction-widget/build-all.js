'use strict';
var Instructions = require('./instructions');
var inputs = require('./data/inputs.json');

/**
 * Module to build all instructions for all (os, webeserver)
 * pairs. Returns a json object to be rendered by Jekyll
 * on the no-js fallback instruction page.
 */
module.exports = (function BuildAll() {
  var os_list = inputs.operating_systems;
  var server_list = inputs.webservers;

  function build() {
    var data = [];

    for (let os of os_list) {
      for (let server of server_list) {
        var set = build_set(os, server);
        data.push(set);
      }
    }

    return data;
  }

  // Build all instructions for a single (os, webserver) pair.
  function build_set(os, server) {
    var set = {};
    set.os = os;
    set.server = server;

    var input = {
      distro: os.distro,
      version: os.version,
      webserver: server.id
    }
    set.instructions = Instructions().get_partials(input);
    return set;
  }

  return {
    build: build
  };
})();