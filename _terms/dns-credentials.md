---
title: DNS Credentials
lookup: dns-credentials
---
DNS credentials are a password or other kind of secret (such as an API key) that your DNS provider lets you use to change the contents of your DNS records. They are usually issued by your domain registrar (or by another DNS provider, if your DNS provider isn’t the same as your registrar). DNS credentials are a sensitive kind of secret because they can be used to take over your site completely.
You should never share these credentials publicly or with an unauthorized person. It can be OK to provide a copy of them to Certbot to let it perform DNS validation automatically, since it runs locally on your machine.