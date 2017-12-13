# Editing the Certbot instructions
Certbot instructions are available for editing as part of the https://github.com/certbot/website repository - if you've found an error or generally think that you can improve them we welcome your support!
## Source Files
The files for the instruction generator are in https://github.com/certbot/website/tree/master/_scripts/instruction-widget  

They're mostly determined by the template files in the [templates directory](https://github.com/certbot/website/tree/master/_scripts/instruction-widget/templates) which are made up of HTML and [mustache.js template](https://mustache.github.io/) commands.  

Some of the text is set through javascript which can be found [here](https://github.com/certbot/website/blob/master/_scripts/instruction-widget/install.js)

## Editing
Most text is determined by by the HTML in the template files. To edit them you'll need a basic understanding of HTML.  

Anything inside of `{{ example_text }}` is a mustache.js template - which documentation can be read about [here](https://mustache.github.io/mustache.5.html).   

Certain variables, such as the specific command to invoke certbot, are determined in `install.js` and `getting-started.js` and are set as context elements to go along with the ones determined by the drop down options (defined [here](https://github.com/certbot/website/blob/master/_scripts/instruction-widget/data/inputs.json)).  

These allow you to change certain text selectively based on the specific webserver or OS that the user has specified. This means that if there is an error for your specific webserver or OS instructions you should check both the corresponding js file and template for the source of that error.  

For example if the [Gentoo install instructions](https://certbot.eff.org/#gentoo-apache) have the wrong commands you'll want to look at the [Gentoo template file](https://github.com/certbot/website/blob/master/_scripts/instruction-widget/templates/install/gentoo.html) as well as the [Gentoo section of install.js](https://github.com/certbot/website/blob/master/_scripts/instruction-widget/install.js#L122)

Altrenately if the Getting Started instructions for Apache on Gentoo are wrong - you may want to add a variable to the [get-started.js](https://github.com/certbot/website/blob/master/_scripts/instruction-widget/get-started.js) or add a specific check to the appropriate template file (found [here](https://github.com/certbot/website/tree/master/_scripts/instruction-widget/templates/getting-started))
