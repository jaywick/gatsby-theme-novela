require('dotenv').config({
    path: `../.env.${process.env.NODE_ENV}`,
})

const gitCreds = `${process.env.GATSBY_GITHUB_USER}:${process.env.GATSBY_GITHUB_TOKEN}`
const gitProject =
    process.env.NODE_ENV === 'development'
        ? 'jaywick/test-xyz-content.git'
        : 'jaywick/jaywick-xyz-content.git'

const gitRepo = `https://${gitCreds}@github.com/${gitProject}`

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
            url: `https://dev.to/jay_wick`,
        },
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
            remotePosts: {
                remote: gitRepo,
                patterns: `doc/blog/**`,
            },
            contentPath: 'doc/blog',
            contentAuthors: 'content/authors',
            basePath: '/',
            authorsPage: true,
            mailchimp: false,
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
]

module.exports = {
    siteMetadata,
    plugins,
}
