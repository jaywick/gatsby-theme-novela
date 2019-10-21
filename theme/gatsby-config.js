/* eslint-disable */
// const feedOptions = require('./config/gatsby-plugin-feed')
const mdxOptions = require('./config/gatsby-plugin-mdx')
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

module.exports = ({
    contentAuthors = 'content/authors',
    remotePosts: remotePostOptions,
}) => {
    ensure(remotePostOptions, 'remotePostOptions', 'name', 'remote', 'patterns')

    return {
        mapping: {
            'Mdx.frontmatter.author': `Authors2Yaml`,
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
    }
}

function ensure(obj, objName, ...paths) {
    const missingProperties = paths.filter(path => isNil(get(obj, path)))

    if (missingProperties.length > 0) {
        throw new Error(
            `Config values cannot be nil for gatsby-config/xyz-theme for: ${missingProperties.map(
                p => `${objName}.${p}`,
            )}`,
        )
    }
}
