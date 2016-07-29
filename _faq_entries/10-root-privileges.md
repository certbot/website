---
title:  "Does Certbot require root/administrator privileges?"
weight: 10
---

Whether root is required to run Certbot or not depends on how you intend to use it.  

If you're asking this question because you have a hosting provider that doesn't grant you root access, you'll need to ensure first of all that you have a way to install a certificate if you get one. If the answer is "no", ask your hosting provider to support Let's Encrypt (many already do).  If the answer is "yes", or you're asking  the question for security reasons, read on...

The [webroot](/docs/using.html#webroot) and [manual](/docs/using.html#manual) plugins work well without root privileges.  However, you need to provide writable paths for Certbot's working directories either by ensuring that `/etc/letsencrypt/`, `/var/log/letsencrypt/`, `/var/lib/letsencrypt/` are writable, or by picking different directories with the `--config-dir`, `--logs-dir`, and `--work-dir` flags.

The [standalone](https://certbot.eff.org/docs/using.html#standalone) plugin requires root to bind port 80 or 443, although on Linux you could also grant [CAP_NET_BIND_SERVICE](http://superuser.com/a/892391) to the relevant user.

Certbot's Apache and Nginx plugins normally require root both for making temporary and persistent changes to webserver configurations, and to perform graceful reload events for those servers.

The `certbot-auto` script works on the assumption that root privileges will be used, both in order to install OS dependencies where required and because it needs to support all of the plugins mentioned above. The packaged versions of Certbot are more flexible, and some of the teams building these packages are working toward having Cerbot run with group rather than root privileges where possible.
