module.exports.default = {
    extensions: [`.mdx`, `.md`],
    gatsbyRemarkPlugins: [
        {
            resolve: `gatsby-remark-images`,
            options: {
                maxWidth: 10000,
                linkImagesToOriginal: false,
                quality: 80,
                withWebp: true,
            },
        },
        { resolve: `gatsby-remark-copy-linked-files` },
        { resolve: `gatsby-remark-numbered-footnotes` },
        { resolve: `gatsby-remark-smartypants` },
        {
            resolve: 'gatsby-remark-external-links',
            options: {
                target: '_blank',
                rel: 'noreferrer', // eslint-disable-line unicorn/prevent-abbreviations
            },
        },
    ],
    remarkPlugins: [require(`remark-slug`)], // eslint-disable-line global-require
}
