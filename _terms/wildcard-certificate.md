---
title: Wildcard Certificate
lookup: wildcard-certificate
---
A wildcard certificate is a certificate that includes one or more names starting with `*.`. Browsers will accept any label in place of the asterisk (`*`). For example, a certificate for `*.example.com` will be valid for `www.example.com`, `mail.example.com`, `hello.example.com`, and `goodbye.example.com`.

However, a wildcard certificate including *only* the name `*.example.com` will **not** be valid for `example.com`: the substituted label can not be empty. If you want the certificate to be valid for `example.com`, you also need to include `example.com` (i.e. without the `*.` part) on the certificate.

Additionally, the asterisk can only be substituted by a *single* label and not by *multiple* labels. For example, the name `hello.goodbye.example.com` will not be covered by a certificate including only the name `*.example.com`. It *will* be covered however, by `*.goodbye.example.com`. Note that a wildcard name can not contain multiple asterisks. For example, `*.*.example.com` is not valid.
