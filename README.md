Gatsby theme for jaywick.xyz hard forked from [Narative's](https://www.narative.co) amazing theme [Novela](https://www.narative.co/labs/novela/).

## Requirements

.env file with

* `GATSBY_GITHUB_USER`
* `GATSBY_GITHUB_TOKEN`

## Packages

### `theme`

Purely theme related, this should be as brand and author agnostic as possible.

### `www`

Config which is used by the `theme` package to create the final website. Check out the [gatsby-config.js](./www/gatsby-config.js) to see what is configurable.

## Folder structure

```bash
│   # published articles with numeric keys
├───articles/
│   └───123/
│       ├───index.mdx
│       └───hero.png
│
│   # list of avatars
├───authors/
│   ├───diana-prince.jpg
│   └───bruce-wayne-.png
│
│   # unpublished articles, with keys as uuid
├───drafts/
│   └───276bbe5b4bc043e8a1535e67004d0224/
│       ├───index.mdx
│       └───hero.png
│
│   # extra info about tags
└───tags/
│   └───avatars/
│   │   └───cool-new-project-.png
│   └───tags.yml
```
