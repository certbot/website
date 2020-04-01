---
layout: hosting_providers
title: Does My Hosting Provider Offer HTTPS?
class: hosting
---

<div class="shared-hosting">
  <h3>This page is for users of {% include tooltip.html term-name="shared-hosting" text="shared hosting" %}.</h3>
  <br>

  If you're not using the shared hosting product, or if your provider doesn't appear here, check out our <a href="/instructions">instructions</a> for using Certbot or <a href="/help">get help</a>. Note that your shared hosting is not the same as your {% include tooltip.html term-name="domain-registrar" text="domain registrar" %}.

</div>


**_The list is categorized into:_**

<div class="provider-categories">
  <p><a id="all-bounce" href="#table-anchor">All Hosting providers</a>: Find your provider here.</p>

  <p><a id="full-bounce" href="#table-anchor"><img alt="Full HTTPS support" src="/images/GreenCheck.svg">Full HTTPS Support</a>: Hosting providers that offer free Let’s Encrypt HTTPS certificates automatically for their shared hosting product. No need to do anything on your end if you use their service.</p>

  <p><a id="partial-bounce" href="#table-anchor"><img alt="Partial HTTPS support" src="/images/PartialHTTPSSupport.svg">Partial HTTPS Support</a>: Hosting providers that offer free Let’s Encrypt HTTPS certificates for their shared hosting product, but require configuration. You’ll need to follow a tutorial.</p>

  <p><a id="no-bounce" href="#table-anchor"><img alt="No HTTPS support" src="/images/NoHTTPSSupport.svg">No HTTPS Support</a>: Hosting providers that do not offer free HTTPS certificates for their shared hosting product. It may or may not be possible to use Certbot with other products that the provider offers, such as their VPS product.</p>
</div>
