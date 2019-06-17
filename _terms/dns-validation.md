---
title: DNS Validation
lookup: dns-validation
---
DNS validation is a method to prove your control over your domain name by asking you to create specific DNS TXT records within the domain. This requires you to have appropriate credentials to change your DNS records. DNS validation is one of the options provided by Let’s Encrypt to prove your control over your domain name.
If you have a DNS provider that’s supported by Certbot, Certbot can automate this process. Otherwise, you would have to perform it yourself every time you renew your certificate. Most Certbot users don’t need to perform DNS validation, but it’s required by Let’s Encrypt if you want a wildcard certificate, and it can also be a useful option if your web server can’t receive connections from the Internet (for example, because it’s on a private network behind a firewall).