---
layout: hosting_providers
title: Does My Hosting Provider Offer HTTPS?
class: hosting
---

## How did you set up your website?

If you have a website, you maybe went through a process that included:
<ol>
  <li>
    Buying a domain from a company (yourwebsite.com)
  </li>
  <li>
    Choosing a server to host that website. This often involves picking a hosting provider.
    <div class="three-col">
      <div class="col">
        <img src="/images/HTTPsite.svg">
        <div class="text-wrapper">
          <span>
            your website domain (http://example.com)<br/>
            might be purchased from a domain registrar company
          </span>
        </div>
      </div>
      <div class="col">
        <img src="/images/Server.svg">
        <div class="text-wrapper">
          <span>
            a server hosts your website
          </span>
        </div>
      </div>
      <div class="col">
        <img src="/images/HostingProvidersServers.svg">
        <div class="text-wrapper">
          <span>
            and this server might be provided by a hosting provider
          </span>
        </div>
      </div>
    </div>
  </li>
  <li>
    Often, people will pick a shared hosting product from the hosting provider, which may include an HTTPS certificate as part of their package. This page is for these users.
  </li>
</ol>

## Do you use shared hosting?

If you’re not using the shared hosting product, or if your provider doesn’t appear here, check out our instructions for using Certbot or get help.

**_The list is categorized into:_**

Full HTTPS Support: Hosting providers that offer free Let’s Encrypt HTTPS certificates automatically for their shared hosting product. (Nno need to do anything on your end if you use their service.)

Partial HTTPS Support: Hosting providers that offer free Let’s Encrypt HTTPS certificates for their shared hosting product, but require configuration. (Yyou’ll need to follow a tutorial.)

No HTTPS Support: Hosting providers that do not offer free HTTPS certificates for their shared hosting product. It may or may not be possible to use Certbot with other products that the provider offers, such as their VPS product.
