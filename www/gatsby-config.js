const dotenv = require('dotenv')

dotenv.config({ path: `../.env.${process.env.NODE_ENV}` })

const {
    GATSBY_GITHUB_USER,
    GATSBY_GITHUB_TOKEN,
    GATSBY_GITHUB_REPO,
    GATSBY_BYPASS_GIT_WITH_LOCAL_TEST_FOLDER,
} = process.env

const branding = {
    name: 'Jay Wick',
    url: 'https://jaywick.xyz',
    intro: 'Jay Wick',
    description:
        'UX developer, amateur designer, and technology apologist. This is my blog and portfolio.',
    socialLinks: [
        'https://dev.to/jay_wick',
        'https://twitter.com/jay_wick',
        'https://github.com/jaywick',
        'https://instagram.com/jaywick_',
        'https://www.linkedin.com/in/jaywick/',
        'https://dribbble.com/jaywick',
        'https://www.youtube.com/user/jaywickvideos',
    ],
    theme: `#111216`,
    googleAnalyticsTrackingId: undefined,
}

const progressiveWebAppOptions = {
    name: branding.name,
    short_name: branding.name,
    start_url: `/`,
    background_color: branding.theme,
    theme_color: branding.theme,
    display: `standalone`,
    icon: `src/assets/favicon.png`,
}

module.exports = {
    siteMetadata: {
        title: branding.name,
        name: branding.name,
        siteUrl: branding.url,
        description: branding.description,
        hero: {
            heading: branding.intro,
            subheading: branding.description,
            maxWidth: 652,
        },
        social: branding.socialLinks.map(url => ({ url })),
    },
    plugins: [
        {
            resolve: 'xyz-theme',
            options: {
                remotePosts: {
                    name: 'content',
                    remote: `https://${GATSBY_GITHUB_USER}:${GATSBY_GITHUB_TOKEN}@github.com/${GATSBY_GITHUB_REPO}`,
                    patterns: `**`,
                    bypassGitWithLocalTestFolder: GATSBY_BYPASS_GIT_WITH_LOCAL_TEST_FOLDER,
                },
                contentPath: 'articles',
                contentAuthors: 'authors',
                basePath: '/',
                authorsPage: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: progressiveWebAppOptions,
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: branding.googleAnalyticsTrackingId,
            },
        },
    ],
}
