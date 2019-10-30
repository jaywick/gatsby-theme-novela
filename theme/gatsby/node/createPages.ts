import dotenv from 'dotenv'
import {
    normalizeArticles,
    normalizeTags,
    normalizeAuthors,
} from '../data/normalize'
import { queryArticles, queryTags, queryAuthors } from '../data/query'
import { resolve as resolvePath } from 'path'
import { buildPaginatedPath, byDateSorter, slugifyWithBase } from './utils'
import { IAuthor, IArticle, IConfig, IPluginApi, ITag } from '@types'
import { log, tuple } from './utils'
import { uniqBy } from 'lodash'
import createPaginatedPages from 'gatsby-paginate'
import { Node } from 'gatsby'

dotenv.config()

type Templates = 'home' | 'article' | 'author' | 'tag' | 'redirect'

const resolveTemplate = (filename: Templates) => {
    return resolvePath(__dirname, '../../src/templates', `${filename}.tsx`)
}

const createArticlePages = (opts: {
    articles: IArticle[]
    authors: IAuthor[]
    tags: ITag[]
    createPage: Function
    basePath: string
    pageLength: number
}) => {
    log('Creating', 'home page')
    createPaginatedPages({
        edges: opts.articles,
        pathPrefix: opts.basePath,
        createPage: opts.createPage,
        pageLength: opts.pageLength,
        pageTemplate: resolveTemplate('home'),
        buildPath: buildPaginatedPath,
        context: {
            authors: opts.authors,
            basePath: opts.basePath,
            skip: opts.pageLength,
            limit: opts.pageLength,
            tags: opts.tags.map(enrichTags),
        },
    })

    const unknownTags = new Set<string>()

    log('Creating', 'article posts')
    opts.articles.forEach((article, index) => {
        let next = opts.articles.slice(index + 1, index + 3)

        if (next.length === 0) {
            next = opts.articles.slice(0, 2)
        }

        if (next.length === 1 && opts.articles.length !== 2) {
            next = [...next, opts.articles[0]]
        }

        if (opts.articles.length === 1) {
            next = []
        }

        // create redirect for URLs without slug
        opts.createPage({
            path: article.permaLink,
            component: resolveTemplate('redirect'),
            context: {
                redirect: article.link,
            },
        })

        const articleAuthor = opts.authors.filter(
            author => author.name === article.author,
        )

        if (!articleAuthor) {
            throw new Error(
                `Could not find author '${
                    article.author
                }' from authors list ${JSON.stringify(opts.authors)}`,
            )
        }

        const articleTag = opts.tags.find(x => x.key === article.tag)

        if (!articleTag) {
            unknownTags.add(article.tag)
        }

        opts.createPage({
            path: article.link,
            component: resolveTemplate('article'),
            context: {
                article,
                tag: articleTag,
                authors: articleAuthor,
                basePath: opts.basePath,
                permaLink: article.permaLink,
                link: article.link,
                id: article.id,
                title: article.title,
                next,
            },
        })
    })

    if (unknownTags.size > 0) {
        unknownTags.forEach(tag => {
            console.log(
                '\u001B[33m',
                `Article tag "${tag}" is not defined in the Tags yaml`,
            )
        })
    }
}

const createTagPages = (opts: {
    articles: IArticle[]
    tags: ITag[]
    createPage: Function
    pageLength: number
}) => {
    const articlesByTag = opts.tags.map(tag =>
        tuple(tag, opts.articles.filter(article => article.tag === tag.key)),
    )

    log('Creating', 'tag pages')
    articlesByTag.forEach(([tag, taggedArticles]) => {
        const path = slugifyWithBase(tag.key, '/tags')

        createPaginatedPages({
            edges: taggedArticles,
            pathPrefix: `/tags/${tag.key}`,
            createPage: opts.createPage,
            pageLength: opts.pageLength,
            pageTemplate: resolveTemplate('tag'),
            buildPath: buildPaginatedPath,
            context: {
                tag,
                originalPath: path,
                skip: opts.pageLength,
                limit: opts.pageLength,
            },
        })
    })
}

const createAuthorPages = (opts: {
    articles: IArticle[]
    authors: IAuthor[]
    createPage: Function
    pageLength: number
}) => {
    log('Creating', 'authors page')

    opts.authors.forEach(author => {
        const articlesTheAuthorHasWritten = opts.articles.filter(article =>
            article.author.toLowerCase().includes(author.name.toLowerCase()),
        )

        createPaginatedPages({
            edges: articlesTheAuthorHasWritten,
            pathPrefix: author.permaLink,
            createPage: opts.createPage,
            pageLength: opts.pageLength,
            pageTemplate: resolveTemplate('author'),
            buildPath: buildPaginatedPath,
            context: {
                author,
                originalPath: '/about',
                skip: opts.pageLength,
                limit: opts.pageLength,
            },
        })
    })
}

export const createPages = async (
    pluginApi: IPluginApi<Node>,
    themeOptions: IConfig,
) => {
    const {
        graphql,
        actions: { createPage },
    } = pluginApi
    const { basePath = '/', pageLength = 6 } = themeOptions

    let allArticles: IArticle[] = []
    let allAuthors: IAuthor[] = []
    let allTags: ITag[] = []

    log('Config basePath', basePath)

    try {
        log('Querying Authors & Aritcles source:', 'Local')
        const articlesQuery = await graphql(queryArticles)
        const authorsQuery = await graphql(queryAuthors)
        const tagsQuery = await graphql(queryTags)

        allArticles = articlesQuery.data.articles.edges.map(normalizeArticles)
        allAuthors = authorsQuery.data.authors.edges.map(normalizeAuthors)
        allTags = tagsQuery.data.tags.edges.map(normalizeTags)
    } catch (error) {
        console.error(error)
    }

    const articles = allArticles.sort(byDateSorter)
    const authors = uniqBy(allAuthors, 'name')
    const tags = uniqBy(allTags, 'key')

    if (articles.length === 0) {
        throw new Error(
            'You must have at least one Article. See the top level README about expected file structure',
        )
    }

    if (authors.length === 0) {
        throw new Error(
            'You must have at least one Author. See the top level README about expected file structure',
        )
    }

    if (tags.length === 0) {
        throw new Error(
            'You must have at least one Tag. See the top level README about expected file structure',
        )
    }

    createArticlePages({
        articles,
        authors,
        tags,
        basePath,
        createPage,
        pageLength,
    })

    createTagPages({ articles, tags, createPage, pageLength })

    createAuthorPages({
        articles,
        authors,
        createPage,
        pageLength,
    })
}

// todo: move to onCreateNode
const enrichTags = (tag: ITag): ITag => ({
    ...tag,
    link: tag.link || `/tags/${tag.key}`,
})
