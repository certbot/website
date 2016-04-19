---
title:  "Can I get a certificate for multiple domain names (SAN certificates)?"
weight: 6
---

Yes, the same certificate can apply to several different names using the Subject Alternative Name (SAN) mechanism. Certbot automatically requests certificates for multiple names when requested to do so. The resulting certificates will be accepted by browsers for any of the domain names listed in them.
