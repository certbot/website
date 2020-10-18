---
title: Wildcard Certificate
lookup: wildcard-certificate
---
A wildcard certificate is a certificate that includes one or more names starting with `*.`. Browsers will accept any label in place of the asterisk (`*`). For example, a certificate for `*.example.com` will be valid for `www.example.com`, `mail.example.com`, `hello.example.com`, and `goodbye.example.com`.

However, a wildcard certificate including *only* the name `*.example.com` will **not** be valid for `example.com`: the substituted label can not be empty. If you want the certificate to be valid for `example.com`, you also need to include `example.com` (i.e. without the `*.` part) on the certificate.

Also, the asterisk can only be substituted by a *single* label and not by *multiple* labels. For example, the hostname `hello.goodbye.example.com` will not be covered by a certificate just containing hostname `*.example.com`. It *will* be covered however, by a certificate containing `*.goodbye.example.com`. Also note that a wildcard certificate can not contain multiple asterisks. For example, a certificate containing `*.*.example.com` is not valid and will not be issued by Let's Encrypt.
