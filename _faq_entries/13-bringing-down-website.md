---
title:  "Can I issue a certificate without bringing down my web server?"
weight: 13
---

Yes, the [ACME protocol](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md) is designed to perform server validation without any downtime. You can use the [webroot mode](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot) in the Certbot client, which places a validation file at a specific location on your web server, or the [Apache](https://letsencrypt.readthedocs.org/en/latest/using.html#apache) mode, which configures a temporary self-signed certificate for validation and gracefully reloads Apache.
