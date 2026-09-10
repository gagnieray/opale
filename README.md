# Opale Redmine Theme

A Redmine 5.x, 6.x & 7.x theme.

[![AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Linters](https://github.com/gagnieray/opale/actions/workflows/lint.yml/badge.svg)](https://github.com/gagnieray/opale/actions/workflows/lint.yml)
[![SCSS](https://img.shields.io/badge/SCSS%20code%20style-Standard-brightgreen.svg)](https://github.com/stylelint-scss/stylelint-config-standard-scss)
[![CSS](https://img.shields.io/badge/CSS%20code%20style-SMACSS-brightgreen.svg)](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)

---

![Screenshot](./screenshots/issues.png)

## Main features

* Left sidebar,
* Colored trackers links,
* Jira-inspired priority icons,
* Customizable with SCSS,
* GitHub-style dark mode with a light/dark button.

## Releases

* **Redmine 6.x & 7.x** : use either the latest release ([1.7.1](https://github.com/gagnieray/opale/archive/refs/tags/1.7.1.zip)), or use the `master` branch of this repository.
* **Redmine 5.x** : use either the latest 1.5.x release ([1.5.6](https://github.com/gagnieray/opale/archive/refs/tags/1.5.6.zip)), or use the `redmine-5.x` branch of this repository.

## Install

To install this theme :

1. [download the lastest release](https://github.com/gagnieray/opale/archive/refs/tags/1.7.1.zip) and decompress the archive to your Redmine's `themes` folder,
2. rename the folder `opale-1.7.1` to `opale`,
3. go to `Redmine > Administration > Settings > Display`, select `Opale` from the theme's list and save the settings.

## Color mode

Use the button in the header to switch between light and dark mode. Light mode
is the default. Your choice is saved in this browser using `localStorage`; if
storage is unavailable, switching still works for the current page. Button
labels are Chinese on Chinese pages and English otherwise. Printing uses the
original light styles.

Install the whole theme, including `javascripts/theme.js` and
`stylesheets/application.css`. Redmine loads the switch automatically without
plugin or template changes. See [Troubleshooting](#troubleshooting) if updated
assets do not appear.

The dark palette is in `src/sass/components/_dark-mode.scss`. After editing it,
run `npm run lint` and `npm run build`. Run `npm test` to check the switch;
it uses Node.js built-ins and requires no additional test dependencies.

## Customize

If you wish to customize this theme to your needs, it is recommended that you use [Custom Opale Redmine Theme Builder](https://github.com/gagnieray/custom-opale-builder).

You will be able to override the Sass variables defined in `src/sass/_variables.scss` with the `!default` flag, add a logo and/or a favicon, and eventually add any custom Sass style rules you want.

## Troubleshooting

**Upon initial installation, it might occur that the theme appears to be broken because the assets were not loaded**.

This happens because the assets of the theme have not been precompiled properly by Redmine.

Usually simply restarting the server should fix that.

If not, run the command `bundle exec rake assets:precompile RAILS_ENV=production` before restarting the server.

If deploying to a sub-uri, set the relative URL root as follows: `bundle exec rake assets:precompile RAILS_ENV=production RAILS_RELATIVE_URL_ROOT=/sub-uri`.

If you still experience issues with missing assets in the browser, try removing the public/assets directory before re-running the precompile: `bundle exec rake assets:clobber RAILS_ENV=production`.

## About Redmine Backlogs plugin

This theme also features a new look for [Redmine Backlogs](https://github.com/maedadev/redmine_backlogs) plugin.

To install it, simply copy stylesheets from `opale/plugins/redmine_backlogs` and overwrite files in `{redmine}/plugins/redmine_backlogs/assets/stylesheets`.

Then restart Redmine.

## Contributing

[Bug reports](https://github.com/gagnieray/opale/issues) and [Pull requests](https://github.com/gagnieray/opale/pulls) are welcome.
Please [read more about contributing](./CONTRIBUTING.md).

## Authors

[Read more about the authors](./AUTHORS.md).

## Copying

_Opale Redmine Theme_ is licensed under the [GNU Affero General Public License v3.0 or later](https://www.gnu.org/licenses/agpl-3.0), the text of which can be found in [LICENSE](./LICENSE).

Licensing of included components:

* Normalize.css : [MIT License](https://github.com/necolas/normalize.css/blob/master/LICENSE.md),
* Bootstrap Mixins : [MIT License](https://github.com/twbs/bootstrap/blob/main/LICENSE),
* Tabler Icons: [MIT License](https://github.com/tabler/tabler-icons/blob/main/LICENSE).

All unmodified files from these projects retain their original copyright and license notices: see the relevant individual source files in `src/sass/vendor/`
