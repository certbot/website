---
title: Wildcard Certificate
lookup: wildcard-certificate
---
A wildcard certificate is a certificate that covers one or more names starting with *. and that will be accepted by a web browser for any subdomain name with any label in place of the * character. For example, a certificate for *.example.com will be valid for www.example.com, mail.example.com, hello.example.com, or goodbye.example.com, but not for example.com. If you want the certificate to be valid for example.com too, you will need to add the hostname example.com and the wildcard hostname *.example.com to the same certificate.
