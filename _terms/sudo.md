---
title: sudo
lookup: sudo
---
Sudo is the most common command on Unix-like operating systems to run a specific command as root (the system administrator). 
If you’re logged in to your server as a user other than root, you’ll likely need to put sudo before your Certbot commands so that they run as root (for example, sudo certbot instead of just certbot), especially if you’re using Certbot’s integration with a web server like Apache or Nginx. (The certbot-auto script automatically runs sudo if it’s necessary and you didn’t specify it.)