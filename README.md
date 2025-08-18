# Certbot Website

This website is now internally maintained.

## Editing content

Please suggest content changes on [Mattermost](https://opensource.eff.org/signup_user_complete/?id=6iqur37ucfrctfswrs14iscobw) or via an issue in [Github](https://github.com/certbot/website/issues/new/choose).

## Hosting providers list

If you notice information that’s out of date or incorrect, [submit a pull request](https://github.com/certbot/website/blob/master/_data/hosting_providers.json) to our website’s Github repo. Make sure to check out tips for successfully editing the hosting providers list. 

- Make sure to fill out the `name`, `link`, `category`, and `reviewed` fields.
- `reviewed` should be a date in format `2019.7.11`.
- `link` is usually a link to the provider's main page; it's where clicking on the name will go.
- for `category`, see descriptions [here](https://certbot.eff.org/hosting_providers/).
- for `full`/`partial` categories, one of the links provided should have evidence of being in that category.
  - only one of `tutorial`, `announcement`, `plan` will show up, in that order.
    - `partial` should have `tutorial`.
    - `full` providers shouldn't need a tutorial to turn on https. an exception might include instructions of what to do if something goes wrong and the automatic https doesn't work.
- if one provider offers multiple products, either split into two entries or note it in the `note` field.
- the `note` field is good for things like noting which products have https, or that the site is available only in certain languages. it's not meant to advertise the hosting provider's site/offerings.
- all unused fields should be `""`
