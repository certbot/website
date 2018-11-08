---
layout: page
title: Certbot Privacy Policy
class: privacy
---
The certbot.eff.org site is covered under the [EFF privacy policy](https://www.eff.org/policy).

Certbot is an extensible client for Certificate Authorities that speak the ACME protocol. Currently, the default CA is Let's Encrypt. Certbot can automate the tasks of obtaining certificates and configuring webservers to use them. While Certbot runs on your computer, it necessarily needs to collect and transfer some information to the CA in order to do its job.  

Certbot is published by the Electronic Frontier Foundation, the leading nonprofit organization defending civil liberties in the digital world. EFF is committed to protecting privacy online, and has established this Privacy Policy to explain what information Certbot collects and how it is used.

<h2>Information Collection</h2>
Certbot locally stores a variety of information provided by you, including internal housekeeping information created by the ACME protocol, the certificate information  (domain name, public key, time, and specifically selected options), the IP address of the server, a user agent string, which is the operating system the server is running, plus which plugins you're using with Certbot. If you use the "manual" authenticator plugin on your own laptop, the IP address logged by the CA would be the one your ISP gave you, rather than that of the public server.

In addition to the minimal information necessary to create certificates Certbot may also transmit additional information to facilitate reliable operation and debugging of ACME client and server software.  By default this includes a detailed User Agent string, which may contain a variety of values, such as the operating system and version of the machine on which Certbot is run and the software version, the plugins that the user selected, the command with which you called Certbot, and certain flags on the command line or fields in config files. You can alter or remove this with the `--user-agent` flag.  We may also ask you questions in the interface, and Certbot may also transmit the answers to the CA. Certbot also may transmit contact information such as an email address, if you choose to supply one, so that the CA can notify you about matters such as expiring, unrenewed certificates; security vulnerabilities; or important changes to its policies.

Certbot never transmits the private key associated with your certificate to the CA, EFF, or anyone else.

Certbot may also ask you to provide information to EFF, such as your contact information, bug reports or information to help with technology research, which generally will not include personally identifiable information.

<h2>Information Disclosure</h2>
Certbot provides this information to the CA you select. 

Currently, Certbot works with Let’s Encrypt by default, which, as of April 2016, has three documents that discuss its privacy practices for this information; the [Let’s Encrypt Privacy Policy](https://letsencrypt.org/privacy/) section on Subscribers, it’s [Certification Practice Statement](https://letsencrypt.org/documents/ISRG-CPS-March-16-2016.pdf) (which, as of April 2016, just references back to the Privacy Policy), and the [Let’s Encrypt Subscriber Agreement](https://letsencrypt.org/documents/LE-SA-v1.0.1-July-27-2015.pdf) (Section 4.1). 

Let’s Encrypt also operates [Community Forums](https://community.letsencrypt.org/), using [Discourse](https://www.discourse.org/), where you may want to look to find answers to your questions about Certbot. These are subject to the [Let’s Encrypt](https://letsencrypt.org/privacy/) and [Discourse](http://www.discourse.org/hosted-forum-privacy-policy/) privacy policies.

Let’s Encrypt may change these policies or providers from time to time. If you have questions about Let’s Encrypt’s privacy practices, please contact them directly at [security@letsencrypt.org](mailto:security@letsencrypt.org).

The Certbot community can be contacted through the Freenode Project’s IRC service, chat.freenode.net, on the #letsencrypt-dev channel. This IRC service is operated by Freenode, which does not publish a privacy policy.

In addition, you may elect to provide information to EFF through Certbot, such as your contact information or bug reports. That information will be protected by the [EFF Technology Project Privacy Policy](https://www.eff.org/code/privacy/policy).

<h2>Changes to This Policy</h2>

EFF's Certbot Privacy Policy may change from time to time. However, any revised privacy policy will be consistent with EFF's mission. 

*Updated on October 25th, 2018 to reflect changes to IRC services used.*

*Updated on June 23rd, 2017 to add additional IRC services.*

*Updated on June 7th, 2017 to clarify which values are collected in the User Agent string.*

#### Previous Privacy Policies

[June 23, 2017 - October 25, 2018](https://github.com/certbot/website/blob/446a47c51fb74db05b8240ddb24174a36e71cc82/privacy/index.md)

[June 7, 2017 - June 23, 2017](https://github.com/certbot/website/blob/21901280e8c6b1e64bbb595a97e8129e2c28b31b/privacy/index.md)

[May 12, 2016 - June 7, 2017](https://github.com/certbot/website/blob/ec3b4a66316d42f6c40f2853686f5e665f8da64a/privacy/index.md)
