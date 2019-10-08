module.exports.default = {
    query: `{
        site {
            siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
            }
        }
    }`,
    setup: ({
        query: {
            site: { siteMetadata },
        },
        ...rest
    }) => {
        // eslint-disable-next-line no-param-reassign
        siteMetadata.feed_url = `${siteMetadata.siteUrl}/rss.xml`
        // eslint-disable-next-line no-param-reassign
        siteMetadata.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`
        const siteMetadataModified = siteMetadata
        siteMetadataModified.feed_url = `${siteMetadata.siteUrl}/rss.xml`
        siteMetadataModified.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`

        return {
            ...siteMetadataModified,
            ...rest,
        }
    },
    feeds: [
        {
            serialize: ({ query: { site, allArticle } }) => {
                return allArticle.edges
                    .filter(edge => !edge.node.secret)
                    .map(edge => {
                        return {
                            ...edge.node,
                            description: edge.node.excerpt,
                            date: edge.node.date,
                            url:
                                site.siteMetadata.siteUrl + edge.node.permaLink,
                            guid:
                                site.siteMetadata.siteUrl + edge.node.permaLink,
                            // custom_elements: [{ "content:encoded": edge.node.body }],
                            author: edge.node.author,
                        }
                    })
            },
            query: `
                {
                    allArticle(sort: {order: DESC, fields: date}) {
                        edges {
                            node {
                                excerpt
                                date
                                permaLink
                                title
                                author
                                secret
                            }
                        }
                    }
                }
            `,
            output: '/rss.xml',
        },
    ],
}
