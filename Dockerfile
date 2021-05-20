FROM python:3.6

RUN mkdir /opt/certbot
WORKDIR /opt/certbot

ENV NODE_ENV production
ENV RUBY_VERSION 2.6.3
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES true

# Set UTF-8 character encoding
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL C.UTF-8

# Configure locales. Install rsync for deploy script, texlive for building docs.
RUN apt-get update && apt-get install locales -y && \
    echo dpkg-reconfigure -f noninteractive tzdata && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    echo 'LANG="en_US.UTF-8"'>/etc/default/locale && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8 && \
    apt-get install -y --no-install-recommends \
    imagemagick \
    gsfonts \
    latexmk \
    rsync \
    sudo \
    texlive \
    texlive-latex-extra

# Install ruby and dependencies
RUN echo 'gem: --no-document' >> /usr/local/etc/gemrc && \
    mkdir /src && cd /src && git clone https://github.com/sstephenson/ruby-build.git && \
    cd /src/ruby-build && ./install.sh && \
    cd / && rm -rf /src/ruby-build && ruby-build $RUBY_VERSION /usr/local && \
    gem install jekyll html-proofer

# Install node and dependencies
RUN apt-get install -y npm
RUN npm install -g n
RUN n 8.12.0
RUN npm install -g npm@"<7" gulp-cli

# Install Javascript packages
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Install docs dependencies
COPY _docs.sh ./
COPY _docs/ ./_docs/
RUN ./_docs.sh depend

COPY . .

RUN gulp build

CMD ["gulp", "jekyll:watch"]
