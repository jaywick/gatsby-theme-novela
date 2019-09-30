/* eslint-disable */
const feedOptions = require('./config/gatsby-plugin-feed')
const mdxOptions = require('./config/gatsby-plugin-mdx')

module.exports = ({
    contentAuthors = 'content/authors',
    contentPosts = 'content/posts',
}) => ({
    mapping: {
        'Mdx.frontmatter.author': `AuthorsYaml`,
    },
    plugins: [
        `gatsby-plugin-typescript`,
        `gatsby-image`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        `gatsby-transformer-yaml`,
        `gatsby-plugin-theme-ui`,
        {
            resolve: `gatsby-plugin-feed`,
            options: feedOptions,
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: contentPosts,
                name: contentPosts,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: contentAuthors,
                name: contentAuthors,
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: mdxOptions,
        },
        {
            resolve: `gatsby-plugin-emotion`,
            options: {
                displayName: process.env.NODE_ENV === `development`,
            },
        },
    ],
})
