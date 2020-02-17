---
layout: hosting_providers
title: Does My Hosting Provider Offer HTTPS?
class: hosting
---

## This page is for users of {% include tooltip.html term-name="shared-hosting" text="shared hosting" %}.

If you’re not using the shared hosting product, or if your provider doesn’t appear here, check out our [instructions](/instructions) for using Certbot or [get help](/help). Note that your {% include tooltip.html term-name="shared-hosting" text="shared hosting provider" %}
is not the same as your {% include tooltip.html term-name="domain-registrar" text="domain registrar" %}.

**_The list is categorized into:_**

<img alt="Green checkmark icon" src="/images/GreenCheck.svg"><a id="full-bounce" href="#table-anchor">Full HTTPS Support</a>: Hosting providers that offer free Let’s Encrypt HTTPS certificates automatically for their shared hosting product. No need to do anything on your end if you use their service.

<img alt="Yellow dash icon" src="/images/PartialHTTPSSupport.svg"><a id="partial-bounce" href="#table-anchor">Partial HTTPS Support</a>: Hosting providers that offer free Let’s Encrypt HTTPS certificates for their shared hosting product, but require configuration. You’ll need to follow a tutorial.

<img alt="Red X icon" src="/images/NoHTTPSSupport.svg"><a id="no-bounce" href="#table-anchor">No HTTPS Support</a>: Hosting providers that do not offer free HTTPS certificates for their shared hosting product. It may or may not be possible to use Certbot with other products that the provider offers, such as their VPS product.
