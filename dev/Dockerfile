FROM ubuntu:18.04

ENV NODE_ENV=development
ENV PATH="$PATH:/usr/local/rvm/bin"

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    imagemagick \
    latexmk \
    texlive \
    texlive-latex-extra \
    curl \
    ca-certificates \
    nginx-light \
 && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://get.rvm.io | bash -s stable \
 && rvm install 2.6.3 \
 && curl -sSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s 8.12.0

RUN npm install gulp \
 && rvm all do gem install jekyll \
 && rvm all do gem install html-proofer

RUN mkdir -p /certbot-website
WORKDIR /certbot-website

CMD [ "/certbot-website/dev/watch-certbot-website.sh" ]
