import * as crypto from 'crypto'
import { IPluginApi, IConfig } from '@types'
import { slugify, generateSlug } from './utils'

const createAuthorNode = (pluginApi: IPluginApi, themeOptions: IConfig) => {
    const {
        actions: { createNode, createParentChildLink },
        createNodeId,
        getNode,
        node,
    } = pluginApi
    const { authorsPage, basePath = '/' } = themeOptions

    const fileNode = getNode(node.parent)

    const permaLink = node.permaLink
        ? `/${node.permaLink}`
        : slugify(node.name as string)

    const fieldData = {
        ...node,
        authorsPage: authorsPage || false,
        permaLink: generateSlug(basePath, 'authors', permaLink),
    }

    createNode({
        ...fieldData,
        id: createNodeId(`${node.id} >>> Author`),
        parent: node.id,
        children: [],
        internal: {
            type: `Author`,
            contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(fieldData))
                .digest(`hex`),
            content: JSON.stringify(fieldData),
            description: `Author`,
        },
    })

    createParentChildLink({ parent: fileNode, child: node })
}

const createArticleNode = (pluginApi: IPluginApi, themeOptions: IConfig) => {
    const {
        actions: { createNode, createParentChildLink },
        createNodeId,
        getNode,
        node,
    } = pluginApi
    const { basePath = '/' } = themeOptions

    const fileNode = getNode(node.parent)

    const permaId = fileNode
        ? fileNode.relativeDirectory.split(/\//g).slice(-1)
        : undefined

    const slug = slugify(node.frontmatter.permaLink || node.frontmatter.title)

    const fieldData = {
        author: node.frontmatter.author,
        date: node.frontmatter.date,
        hero: node.frontmatter.hero,
        secret: node.frontmatter.secret || false,
        slug,
        tags: node.frontmatter.tags,
        permaLink: generateSlug(basePath, 'blog', permaId),
        link: generateSlug(basePath, 'blog', permaId, slug),
        title: node.frontmatter.title,
        subscription: node.frontmatter.subscription !== false,
    }

    createNode({
        ...fieldData,
        id: createNodeId(`${node.id} >>> Article`),
        parent: node.id,
        children: [],
        internal: {
            type: `Article`,
            contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(fieldData))
                .digest(`hex`),
            content: JSON.stringify(fieldData),
            description: `Article Posts`,
        },
    })

    createParentChildLink({ parent: fileNode, child: node })
}

/**
 * Create fields for post slugs and source
 * This will change with schema customization with work
 */
export const onCreateNode = (pluginApi: IPluginApi, themeOptions: IConfig) => {
    const nodeType = pluginApi.node.internal.type

    if (nodeType === `AuthorsYaml`) {
        createAuthorNode(pluginApi, themeOptions)
    } else if (nodeType === `Mdx`) {
        const fileNode = pluginApi.getNode(pluginApi.node.parent)
        const [parentFolder] = fileNode
            ? fileNode.relativePath.split(/\//g)
            : []

        if (parentFolder === 'articles') {
            createArticleNode(pluginApi, themeOptions)
        }
    }
}
