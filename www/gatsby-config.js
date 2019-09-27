require('dotenv').config()

const siteMetadata = {
    title: `Jay Wick`,
    name: `Jay Wick`,
    siteUrl: `https://jaywick.xyz`,
    description: `This is where I experiment with things`,
    hero: {
        heading: `A journey of design, engineering, and unstructured rambling.`,
        maxWidth: 652,
    },
    social: [
        {
            url: `https://twitter.com/jay_wick`,
        },
        {
            url: `https://github.com/jaywick`,
        },
        {
            url: `https://instagram.com/jaywick_`,
        },
        {
            url: `https://www.linkedin.com/in/jaywick/`,
        },
        {
            url: `https://dribbble.com/jaywick`,
        },
        {
            url: `https://www.youtube.com/user/jaywickvideos`,
        },
    ],
}

const plugins = [
    {
        resolve: 'xyz-theme',
        options: {
            contentPosts: 'content/posts',
            contentAuthors: 'content/authors',
            basePath: '/',
            authorsPage: true,
            mailchimp: false,
            sources: {
                local: true,
                contentful: false,
            },
        },
    },
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `Jay Wick`,
            short_name: `Jay Wick`,
            start_url: `/`,
            background_color: `#fff`,
            theme_color: `#fff`,
            display: `standalone`,
            icon: `src/assets/favicon.png`,
        },
    },
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            // trackingId: '//TODO',
        },
    },
    // {
    //     resolve: 'gatsby-plugin-mailchimp',
    //     options: {
    //         endpoint:
    //             'https://narative.us19.list-manage.com/subscribe/post?u=65ef169332a03669b9538f6ef&amp;id=c55c426282',
    //     },
    // },
]

/**
 * For development purposes if there's no Contentful Space ID and Access Token
 * set we don't want to add in gatsby-source-contentful because it will throw
 * an error.
 *
 * To enanble Contentful you must
 * 1. Create a new Space on contentful.com
 * 2. Import the Contentful Model from @narative/gatsby-theme-novela/conteful
 * 3. Add .env to www/ (see www/env.example)
 * 4. Enable contentful as a source in this file for @narative/gatsby-theme-novela
 */
if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
    plugins.push({
        resolve: 'gatsby-source-contentful',
        options: {
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        },
    })
}

module.exports = {
    siteMetadata,
    plugins,
}
