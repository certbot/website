---
title:  "Why does Certbot require root privileges?"
weight: 10
---

Certbot is essentially an operating system component. Generically, it requires root privileges to bind to port 443 and (if requested) to reconfigure your webserver for certificate installation and renewal. When packaged for particular operating systems, it may be configured to operate with somewhat lower privilege levels. It is also possible to use the "manual" mode to complete a verification process and obtain a certificate without running the client software as root.
