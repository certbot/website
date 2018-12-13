---
title:  "Does Let's Encrypt issue wildcard certificates?"
weight: 7
---

Yes! Let's Encrypt has [begun issuing](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579) wildcard certificates in March 2018. Certbot has added support for wildcard certificates as of version 0.22.0. Obtaining a wildcard certificate requires using the DNS authentication method, either via `--manual` or via a Certbot DNS plugin appropriate to your DNS provider.

Note that [depending how you install Certbot](https://community.letsencrypt.org/t/getting-wildcard-certificates-with-certbot/56285), appropriate plugins to automate the process may not yet be available on your system. Information about the DNS plugins [is available in the Certbot documentation](https://certbot.eff.org/docs/using.html#dns-plugins).

**Certificates obtained with `--manual` cannot be renewed automatically with `certbot renew`** (unless you've provided a custom authorization script). However, certificates obtained with a Certbot DNS plugin can be renewed automatically. In order to obtain wildcard certificates that can be renewed without human intervention, you'll need to use a Certbot DNS plugin that's compatible with an API supported by your DNS provider, or a script that can make appropriate DNS record changes upon demand. Even if your regular DNS provider doesn't support a compatible update mechanism, you can use a `CNAME` delegation for the `_acme-challenge` record in your DNS zone to a different provider that does. You can also point `_acme-challenge` to an [acme-dns](https://github.com/joohoi/acme-dns) instance. 

Note that [depending how you install Certbot](https://community.letsencrypt.org/t/getting-wildcard-certificates-with-certbot/56285), appropriate plugins to automate the process may not yet be available on your system.

Please see Certbot documentation for more information about your situation.
