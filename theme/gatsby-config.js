/* eslint-disable */
// const feedOptions = require('./config/gatsby-plugin-feed')
const { mdxOptions } = require('./config/gatsby-plugin-mdx')
const { get, isNil } = require('lodash')

const sourcePostsPlugin = remotePostOptions => {
    if (remotePostOptions.bypassGitWithLocalTestFolder) {
        console.warn(
            `Bypassing git with local folder content for testing: ${remotePostOptions.bypassGitWithLocalTestFolder}`,
        )

        return {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: remotePostOptions.bypassGitWithLocalTestFolder,
                path: remotePostOptions.bypassGitWithLocalTestFolder,
            },
        }
    }

    return {
        resolve: `gatsby-source-git`,
        options: remotePostOptions,
    }
}

module.exports = ({ contentAuthors, remotePosts: remotePostOptions }) => {
    ensure(contentAuthors, 'contentAuthors')
    ensure(remotePostOptions, 'remotePostOptions', 'name', 'remote', 'patterns')

    return {
        mapping: {
            'Mdx.frontmatter.author': `AuthorsYaml`,
            'Mdx.frontmatter.tag': `TagsYaml`,
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
            // {
            //     resolve: `gatsby-plugin-feed`,
            //     options: feedOptions,
            // },
            sourcePostsPlugin(remotePostOptions),
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
            // annoyingly we need this plugin loaded with an empty folder for
            // git-source-plugin to work 🤷‍♂️
            {
                resolve: `gatsby-source-filesystem`,
                options: {
                    name: 'empty',
                    path: 'empty',
                },
            },
        ],
    }
}

function ensure(obj, objName, ...paths) {
    if (!paths || paths.length === 0) {
        if (isNil(obj)) {
            throw new Error(
                `Config value cannot be nil for gatsby-config/xyz-theme for: ${objName}`,
            )
        }
        return
    }

    const missingProperties = paths.filter(path => isNil(get(obj, path)))

    if (missingProperties.length > 0) {
        throw new Error(
            `Config values cannot be nil for gatsby-config/xyz-theme for: ${missingProperties.map(
                p => `${objName}.${p}`,
            )}`,
        )
    }
}
