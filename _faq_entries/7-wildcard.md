---
title:  "Will Let's Encrypt issue wildcard certificates?"
weight: 7
---

Let's Encrypt has [begun issuing](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579) wildcard certificates in March 2018. Certbot has added support for wildcard certificates as of version 0.22.0. Obtaining a wildcard certificate requires using the DNS authentication method, either via `--manual` or via a Certbot DNS plugin appropriate to your DNS provider.

In order to obtain wildcard certificates that can be renewed without human intervention, you'll need a compatible DNS provider API, or a script that can make appropriate DNS record changes upon demand. Even if your regular DNS provider doesn't support a compatible update mechanism, you can use a `CNAME` delegation for the `_acme-challenge` record in your DNS zone to a different provider that does. You can also point `_acme-challenge` to an [acme-dns](https://github.com/joohoi/acme-dns) instance.

Note that [depending how you install Certbot](https://community.letsencrypt.org/t/getting-wildcard-certificates-with-certbot/56285), appropriate plugins to automate the process may not yet be available on your system.

A wildcard should normally be obtained explicitly for both the base domain and subdomains (e.g., `-d example.org -d "*.example.org"`) because the wildcard does not cover the base domain, only subdomains.

Please see Certbot documentation for more information about your situation.
