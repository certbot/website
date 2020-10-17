---
title: Wildcard Certificate
lookup: wildcard-certificate
---
A wildcard certificate is a certificate that contains one or more hostnames starting with `*.` (an asterisk as a DNS label). A client (e.g., a web browser) will accept any (valid DNS) label in place of the asterisk (`*`). For example, a certificate for `*.example.com` will be valid for `www.example.com`, `mail.example.com`, `hello.example.com`, and `goodbye.example.com`.

However, such a wildcard certificate with *just* the hostname `*.example.com` will **not** be valid for `example.com`: the label of the asterisk can not be empty to match such a wildcard hostname. If you want the certificate to be valid for `example.com` too, you will need to explicitly add the hostname `example.com` (i.e., without the `*.` part) *and* the wildcard hostname `*.example.com` to the same certificate.

Also, the asterisk can only be substituted by a *single* label and not by *multiple* labels. For example, the hostname `hello.goodbye.example.com` will not be covered by a certificate just containing hostname `*.example.com`. It *will* be covered however, by a certificate containing `*.goodbye.example.com`. Also note that a wildcard certificate can not contain multiple asterisks. For example, a certificate containing `*.*.example.com` is not valid and will not be issued by Let's Encrypt.
