FROM ubuntu:18.04

ENV NODE_ENV=development
ENV NODE_VERSION=8.12.0
ENV RUBY_VERSION=2.6.3
ENV PATH="$PATH:/usr/local/rvm/bin:/usr/local/rvm/rubies/ruby-${RUBY_VERSION}/bin"

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    imagemagick \
    latexmk \
    texlive \
    texlive-latex-extra \
    curl \
    ca-certificates \
    nginx-light \
    git \
 && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://get.rvm.io | bash -s stable \
 && rvm install "${RUBY_VERSION}" \
 && curl -sSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s "${NODE_VERSION}"

RUN npm install -g gulp \
 && gem install jekyll \
 && gem install html-proofer

RUN mkdir -p /certbot-website
WORKDIR /certbot-website

COPY run.sh /
CMD [ "/run.sh" ]
