---
title:  "Can I use an existing private key or Certificate Signing Request (CSR) with Certbot?"
weight: 11
---

Yes. You can obtain a certificate for an existing CSR, which means you may generate your own CSR using your own private key. However, Certbot will not accept a private key as input and generate a CSR for you.
