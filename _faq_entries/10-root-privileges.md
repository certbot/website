---
title:  "Does Certbot require root privileges?"
weight: 10
---

Certain modes, like webroot and manual modes, work great without root privileges. However, you need to provide writeable paths for Certbot's working directories via the --logs-dir, --work-dir, and --config-dir flags. You can also use standalone mode without root, so long as you grant [CAP_NET_BIND_SERVICE](http://superuser.com/a/892391) to the relevant user.

However, to take full advantage of Certbot's Apache autoconfiguration, we recommend running as root. In this mode, Certbot can detect your web server's configuration and edit on the fly to issue and install a certificate for you, automatically. To do so, Certbot needs root privileges in order to modify your Apache configuration.
