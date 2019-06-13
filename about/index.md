---
layout: page
title: About Certbot
class: about
---

<div class="logos mobile-hidden">
<img src="/images/certbot-logo-1A.svg" alt="Certbot logo">
<img src="/images/LetsEncrypt-logo.svg" alt="Let's Encrypt logo">
<img src="/images/EFF-logo.svg" alt="Electronic Frontier Foundation logo">
</div>

## What’s Certbot?
Certbot is a free, open source software tool for automatically using [Let’s Encrypt](https://letsencrypt.org/) certificates on manually-administrated websites to enable HTTPS.

Certbot is made by the [Electronic Frontier Foundation (EFF)](https://www.eff.org/), a 501(c)3 nonprofit based in San Francisco, CA, that defends digital privacy, free speech, and innovation.

<div class="logos mobile-only">
<img src="/images/certbot-logo-1A.svg" alt="Certbot logo">
<img src="/images/LetsEncrypt-logo.svg" alt="Let's Encrypt logo">
<img src="/images/EFF-logo.svg" alt="Electronic Frontier Foundation logo">
</div>

## Is Certbot right for me?
If you’re looking to add the security and privacy benefits of an HTTPS certificate to your website, you may not need Certbot. Many hosting providers have internal tools to enable HTTPS. Before using Certbot, [check if your hosting provider is one of them](/hosting_providers).

Certbot might be right for you if you:
+ have comfort with the {% include tooltip.html term-name="command-line" text="command line" %},
+ have {% include tooltip.html term-name="website-thats-already-online" text="an HTTP website that’s already online" %}, with {% include tooltip.html term-name="port-80" text="port 80 open" %},
+ and administer your website via a {% include tooltip.html term-name="dedicated-server" text="dedicated server" %}, {% include tooltip.html term-name="virtual-private-server" text="virtual private server" %}, or {% include tooltip.html term-name="cloud-hosting" text="cloud-hosted server" %}, which you can access via {% include tooltip.html term-name="SSH" %}, and have the ability to {% include tooltip.html term-name="sudo" %}.

If you’re ready to use Certbot, we provide customized instructions for your setup at the [Certbot Instructions](/instructions) page.

Certbot renews certificates every 60 days. For more information about how Certbot works and for community managed resources, check out our [Get Help](/help) page.

For more information around the codebase for Certbot and how to get involved as a developer, check out our [Contribute to Certbot](/contribute) page.

Certbot is part of EFF’s larger effort to [encrypt the entire Internet](https://eff.org/encrypt-the-web). Websites need to use HTTPS to secure the web. Along with [HTTPS Everywhere](https://www.eff.org/https-everywhere), Certbot aims to build a network that is more structurally private, safe, and protected against censorship.

Certbot is the work of [many authors](https://github.com/certbot/certbot/graphs/contributors), including a team of EFF staff and numerous open source contributors.

For more information about privacy practices, check out [Certbot’s privacy policy](/privacy).

Want to keep this project (and other EFF projects) alive? [Donate here](https://supporters.eff.org/donate/support-lets-encrypt).
