---
layout: page
title: About Certbot
class: about
---

<div class="logos mobile-hidden">
{{ '![Certbot logo](/images/certbot-logo-1A.svg)' | markdownify }} 
{{ '![Certbot logo](/images/certbot-logo-1A.svg)' | markdownify }} 
{{ '![Certbot logo](/images/certbot-logo-1A.svg)' | markdownify }} 
</div>

## What’s Certbot?
Certbot is a free, open source software tool for automatically using Let’s Encrypt certificates on manually-administrated websites to enable HTTPS. 

Certbot is made by the Electronic Frontier Foundation (EFF), a 501(c)3 nonprofit based in San Francisco, CA, that defends digital privacy, free speech, and innovation.

<div class="logos mobile-only">
{{ '![Certbot logo](/images/certbot-logo-1A.svg)' | markdownify }} 
{{ '![Certbot logo](/images/certbot-logo-1A.svg)' | markdownify }} 
{{ '![Certbot logo](/images/certbot-logo-1A.svg)' | markdownify }} 
</div>

## Is Certbot right for me?
If you’re looking to add the security and privacy benefits of an HTTPS certificate to your website, you may not need Certbot. Many hosting providers have internal tools to enable HTTPS. Before using Certbot, check if your hosting provider is one of them.

Certbot might be right for you if you:
+ have comfort with the command line, 
+ have an HTTP website that’s already online, with Port 80 open,
+ and administer your website via a dedicated server, virtual private server, or cloud-hosted server, which you can access via SSH, and have the ability to sudo.

If you’re ready to use Certbot, we provide customized instructions for your setup at the Certbot 
Instructions page. 

Certbot renews certificates every 60 days. For more information about how Certbot works and for community managed resources, check out our Get Help page. 

For more information around the codebase for Certbot and how to get involved as a developer, check out our Certbot developer Resources page.

Certbot is part of EFF’s larger effort to [encrypt the entire Internet](https://eff.org/encrypt-the-web). Websites need to use HTTPS to secure the web. Along with [HTTPS Everywhere](https://www.eff.org/https-everywhere), Certbot aims to build a network that is more structurally private, safe, and protected against censorship. If HTTPS is new to you, check out our explainer on how transport-layer encryption works and how Certbot’s software fits into this ecosystem.

Certbot is the work of [many authors](https://github.com/certbot/certbot/graphs/contributors), including a team of EFF staff and numerous open source contributors.

For more information about privacy practices, check out Certbot’s [privacy policy](/privacy).

Want to keep this project (and other EFF projects) alive? [Donate here](https://supporters.eff.org/donate/support-lets-encrypt).
