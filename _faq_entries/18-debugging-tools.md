---
title:  "What tools can I use for debugging my site’s HTTPS configuration?"
weight: 15
---

There are four scanning tools that are commonly suggested on the Let’s Encrypt community forum:
 - [https://letsdebug.net/](https://letsdebug.net/) (by Alex Zorin)
 - [https://check-your-website.server-daten.de/](https://check-your-website.server-daten.de/) (by Jürgen Auer)
 - [https://whynopadlock.com/](https://whynopadlock.com/) (by LexiConn)
 - [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/) (by Qualys)

They all have their strengths. Let's Debug would be used only by people who don't have HTTPS working yet, while SSL Labs would be used only by people who (at least sort of) do.

**Let’s Debug**: Let's Debug is most helpful if you have a failed challenge and want a straightforward explanation of why the challenge is failing.

**Check-Your-Website**: Jürgen's scanner is most helpful if you have a confusing DNS or HTTP configuration error where some pages or some browsers work properly and others don't, or if your HTTP site works in a browser and yet you get failed challenges that you don't understand

**Why No Padlock**: Why No Padlock is most helpful if you already have a certificate but all or some users don't see a valid HTTPS connection (and it gives very specific information about what's causing mixed content warnings)

**SSL Labs**: SSL Labs is most helpful for cryptographic issues on an already set up HTTPS site, such as a case where some browsers work properly and others give a ciphersuite-related error, or if you want to convince nerds and/or regulatory bodies that you're following security best practices
