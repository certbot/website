#certbot

first install node package manager. binary downloads of node are available on windows and mac, and on linux try comiling from source or using your preferred package manager.

https://nodejs.org/en/download/

after installing node, `cd` to the certbot directory and run `npm install`

after npm installs the dependencies, run `gulp` for a live development environment.

certbot runs on a frontend prototyping framework tribby has been working on called *concrete*, which itself was used on FAB -- the docs can be found at https://github.com/EFForg/fab-frontend - try logging in or ping max if it throws a 404 , it's a private EFF repo.

this is a *prototype* and not meant to replace jekyll (although it is a suggestion (or maybe use Harp) for the future). it is easy enough to copy & paste prettified jade output and paste into jekyll, which I'm working on now.

(the jade-jeckyll gulp plugin only runs on jekyll 2, same with the slim plugin which is similar to jade). IMHO, it is worth maintaining two separate things for this project only, so that the jade/sass/js "components" can be reused in all the other sites we build by simply copying and pasting a directory like "hero."

#confusing things:

- run `gulp` not `gulp watch` - further build options coming very shortly.
- Jade the templating language (http://www.jade-lang.org/) got renamed to Pug and I am having a daily meltdown over this. for now I'm using the name pug with the intention of switching back to jade.
- all Sass/JS/Dom are stored together as "components" in src/components/. this makes it very easy to reuse these components/widgets elsewhere. all JS gets concatenated into main.js and all CSS gets concatenated into main.css.
- fonts are inlined as base64-encoded .woff files in the CSS. in development that means the CSS file will be huge. don't forget to delete fonts you don't end up using. gulp may not be watching the fonts properly so always actually run "gulp"
- the way susy (css grid) is being used right now is wonky, don't worry about that.
