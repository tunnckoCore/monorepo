# {%= name %} [![npm version][npmv-img]][npmv-url] [![License][license-img]][license-url]

> {%= description %}

Please consider following this project's author, [{%= author.name %}](https://github.com/{%= verb.data.github %}), and :star: the project to show your :heart: and [support](#support-the-project).

<div id="thetop"></div>

[![Code style][codestyle-img]][codestyle-url]
[![CircleCI linux build][linuxbuild-img]][linuxbuild-url]
[![CodeCov coverage status][codecoverage-img]][codecoverage-url]
[![DavidDM dependency status][dependencies-img]][dependencies-url]
[![Renovate App Status][renovateapp-img]][renovateapp-url]
[![Make A Pull Request][prs-welcome-img]][prs-welcome-url]
[![Semantically Released][standard-release-img]][standard-release-url]

If you have any _how-to_ kind of questions, please read the [Contributing Guide][contributing-url] and [Code of Conduct][coc-url] documents.  
For bugs reports and feature requests, [please create an issue][open-issue-url] or ping
[@tunnckoCore](https://twitter.com/{%= verb.data.twitter %}) at Twitter.

[![Become a Patron][patreon-img]][patreon-url]
[![Conventional Commits][ccommits-img]][ccommits-url]
[![Spectrum community][spectrum-community-img]][spectrum-community-url]
[![NPM Downloads Monthly][downloads-monthly-img]][npmv-url]
[![NPM Downloads Total][downloads-total-img]][npmv-url]
[![Share Love Tweet][shareb]][shareu]

Project is [semantically](https://semver.org) versioned & automatically released through [CircleCI](https://circleci.com) with [Standard Release][standard-release-url].

<!-- Logo when needed:

<p align="center">
  <a href="https://github.com/tunnckoCore/hq">
    <img src="./media/logo.png" width="85%">
  </a>
</p>

-->

## Table of Contents

<!-- toc -->

## Install

This project requires [**Node.js**](https://nodejs.org) **{%= engines.node %}** _(see [Support & Release Policy](https://github.com/tunnckoCoreLabs/support-release-policy))_. Install it using
[**yarn**](https://yarnpkg.com) or [**npm**](https://npmjs.com).  
_We highly recommend to use Yarn when you think to contribute to this project._

```bash
$ yarn add {%= name %}
```

{%= ifExists([process.cwd() + '/.verb.md'], include(process.cwd() + '/.verb.md')) %}

**[back to top](#thetop)**

{% if (verb.related && verb.related.list && verb.related.list.length) { %}

## See Also

Some of these projects are used here or were inspiration for this one, others are just related. So, thanks for your existance!

{%= related(verb.related.list, { words: 10 }) %}

**[back to top](#thetop)**
{% } %}

## Contributing

### Guides and Community

Please read the [Contributing Guide][contributing-url] and [Code of Conduct][coc-url] documents for advices.

For bug reports and feature requests, please join our [Spectrum community][spectrum-community-url] forum and open a thread there with prefixing the title of the thread with the name of the project if there's no separate channel for it.

Consider reading the [Support and Release Policy](https://github.com/tunnckoCoreLabs/support-release-policy) guide if you are interested in what are the supported Node.js versions and how we proceed. In short, we support latest two even-numbered Node.js release lines.

### Support the project

[Become a Partner or Sponsor?][patreon-url] :dollar: Check the **Partner**, **Sponsor** or **Omega-level** tiers! :tada: You can get your company logo, link & name on this file. It's also rendered on package page in [npmjs.com][npmv-url] and [yarnpkg.com](https://yarnpkg.com/en/package/{%= name %}) sites too! :rocket:

Not financial support? Okey! [Pull requests](https://github.com/tunnckoCoreLabs/contributing#opening-a-pull-request), stars and all kind of [contributions](https://opensource.guide/how-to-contribute/#what-it-means-to-contribute) are always
welcome. :sparkles:

### OPEN Open Source

This project is following [OPEN Open Source](http://openopensource.org) model

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is built on collective efforts and it's not strongly guarded by its founders.

There are a few basic ground-rules for its contributors

1. Any **significant modifications** must be subject to a pull request to get feedback from other contributors.
2. [Pull requests](https://github.com/tunnckoCoreLabs/contributing#opening-a-pull-request) to get feedback are _encouraged_ for any other trivial contributions, but are not required.
3. Contributors should attempt to adhere to the prevailing code-style and development workflow.

### Wonderful Contributors

Thanks to the hard work of these wonderful people this project is alive! It follows the
[all-contributors](https://allcontributors.org/) specification.  
Don't hesitate to add yourself to that list if you have made any contribution! ;) [See how,
here](https://github.com/jfmengels/all-contributors-cli#usage).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="{%= verb.data.avatar %}" width="120px;"/><br /><sub><b>{%= author.name %}</b></sub>]({%= author.url %})<br />[💻](https://github.com/tunnckoCore/hq/commits?author={%= verb.data.github %} "Code") [📖](https://github.com/tunnckoCore/hq/commits?author={%= verb.data.github %} "Documentation") [💬](#question-{%= verb.data.github %} "Answering Questions") [👀](#review-{%= verb.data.github %} "Reviewed Pull Requests") [🔍](#fundingFinding-{%= verb.data.github %} "Funding Finding") |
| :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

Consider showing your [support](#support-the-project) to them. :sparkling_heart:

## License

Copyright (c) {%= licenseStart %}-present, [{%= author.name %}]({%= author.url %}) `<{%= author.email %}>` & [contributors](#wonderful-contributors).  
Released under the [{%= license %} License][license-url].

<!-- Heading badges -->

[npmv-url]: https://www.npmjs.com/package/{%= name %}
[npmv-img]: https://badgen.net/npm/v/{%= name %}?icon=npm

<!-- When Badgen.net supports it
[ghrelease-url]: https://github.com/tunnckoCore/hq/releases/latest
[ghrelease-img]: https://badgen.net/github/release/tunnckoCore/hq?icon=github -->

[license-url]: /LICENSE

[license-img]: https://badgen.net/npm/license/{%= name %}

<!-- Front line badges -->

[codestyle-url]: https://github.com/airbnb/javascript
[codestyle-img]: https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb
[linuxbuild-url]: https://circleci.com/gh/tunnckoCore/hq/tree/master
[linuxbuild-img]: https://badgen.net/circleci/github/tunnckoCore/hq/master?label=build&icon=circleci
[codecoverage-url]: https://codecov.io/gh/tunnckoCore/hq
[codecoverage-img]: https://badgen.net/codecov/c/github/tunnckoCore/hq?icon=codecov

[dependencies-url]: https://david-dm.org/tunnckoCore/hq?path={%= verb.data.directory %}&type={%= verb.data.depsType || "" %}
[dependencies-img]: https://badgen.net/david/{%= verb.data.depsType || "dep" %}/tunnckoCore/hq/{%= verb.data.directory %}?label=deps

[ccommits-url]: https://conventionalcommits.org/
[ccommits-img]: https://badgen.net/badge/conventional%20commits/v1.0.0/dfb317
[standard-release-url]: https://github.com/standard-release/standard-release
[standard-release-img]: https://badgen.net/badge/semantically/released/05c5ff
[spectrum-community-img]: https://badgen.net/badge/spectrum/community/7b16ff
[spectrum-community-url]: https://spectrum.chat/tunnckoCore

[downloads-weekly-img]: https://badgen.net/npm/dw/{%= name %}
[downloads-monthly-img]: https://badgen.net/npm/dm/{%= name %}
[downloads-total-img]: https://badgen.net/npm/dt/{%= name %}

[renovateapp-url]: https://renovatebot.com
[renovateapp-img]: https://badgen.net/badge/renovate/enabled/green
[prs-welcome-img]: https://badgen.net/badge/PRs/welcome/green
[prs-welcome-url]: http://makeapullrequest.com

[paypal-donate-url]: https://paypal.me/{%= verb.data.github %}/10
[paypal-donate-img]: https://badgen.net/badge/$/support/purple

[patreon-url]: https://www.patreon.com/bePatron?u=5579781

[patreon-img]: https://badgen.net/badge/patreon/{%= verb.data.github %}/F96854?icon=patreon
[patreon-sponsor-img]: https://badgen.net/badge/become/a%20sponsor/F96854?icon=patreon

[shareu]: https://twitter.com/intent/tweet?text=https://github.com/tunnckoCore/hq/{%= verb.data.directory %}&via={%= verb.data.twitter %}
[shareb]: https://badgen.net/badge/twitter/share/1da1f2?icon=twitter

[open-issue-url]: https://github.com/tunnckoCore/hq/issues/new
[contributing-url]: https://github.com/tunnckoCore/hq/CONTRIBUTING.md
[coc-url]: https://github.com/tunnckoCore/hq/CODE_OF_CONDUCT.md
