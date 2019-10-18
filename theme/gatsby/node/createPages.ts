import * as dotenv from 'dotenv'
import * as normalize from '../data/data.normalize'
import * as query from '../data/data.query'
import { resolve as resolvePath } from 'path'
import {
    buildPaginatedPath,
    getUniqueListBy,
    byDateSorter,
    slugifyWithBase,
} from './utils'
import { IAuthor, IArticle, IConfig, IPluginApi } from '@types'
import { log } from './utils'
import { union, flatMap } from 'lodash'
import createPaginatedPages from 'gatsby-paginate'

dotenv.config()

const templatesDirectory = resolvePath(__dirname, '../../src/templates')
const templates = {
    articles: resolvePath(templatesDirectory, 'articles.template.tsx'),
    article: resolvePath(templatesDirectory, 'article.template.tsx'),
    author: resolvePath(templatesDirectory, 'author.template.tsx'),
    articleRedirect: resolvePath(
        templatesDirectory,
        'article-redirect.template.tsx',
    ),
    tags: resolvePath(templatesDirectory, 'tags.template.tsx'),
}

const createArticlePages = (opts: {
    articles: IArticle[]
    authors: IAuthor[]
    createPage: Function
    basePath: string
    pageLength: number
}) => {
    log('Creating', 'articles page')
    createPaginatedPages({
        edges: opts.articles,
        pathPrefix: opts.basePath,
        createPage: opts.createPage,
        pageLength: opts.pageLength,
        pageTemplate: templates.articles,
        buildPath: buildPaginatedPath,
        context: {
            authors: opts.authors,
            basePath: opts.basePath,
            skip: opts.pageLength,
            limit: opts.pageLength,
        },
    })

    log('Creating', 'article posts')
    opts.articles.forEach((article, index) => {
        let authorsThatWroteTheArticle: IAuthor[]
        try {
            authorsThatWroteTheArticle = opts.authors.filter(author => {
                const allAuthors = article.author
                    .split(',')
                    .map(a => a.trim().toLowerCase())

                return allAuthors.some(a => a === author.name.toLowerCase())
            })
        } catch (error) {
            throw new Error(`
                We could not find the Author for: "${article.title}".
                Double check the author field is specified in your post and the name
                matches a specified author.
                Provided author: ${article.author}
                ${error}
            `)
        }

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

        opts.createPage({
            path: article.permaLink,
            component: templates.articleRedirect,
            context: {
                redirect: article.link,
            },
        })

        opts.createPage({
            path: article.link,
            component: templates.article,
            context: {
                article,
                authors: authorsThatWroteTheArticle,
                basePath: opts.basePath,
                permaLink: article.permaLink,
                link: article.link,
                id: article.id,
                title: article.title,
                next,
            },
        })
    })
}

const createTagPages = (opts: {
    articlesByTag: [string, IArticle[]][]
    createPage: Function
    pageLength: number
}) => {
    log('Creating', 'tag pages')
    opts.articlesByTag.forEach(([tag, taggedArticles]) => {
        const path = slugifyWithBase(tag, '/tags')

        createPaginatedPages({
            edges: taggedArticles,
            pathPrefix: `/tags/${tag}`,
            createPage: opts.createPage,
            pageLength: opts.pageLength,
            pageTemplate: templates.tags,
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

        const path = slugifyWithBase(author.name, '/tags')

        createPaginatedPages({
            edges: articlesTheAuthorHasWritten,
            pathPrefix: author.permaLink,
            createPage: opts.createPage,
            pageLength: opts.pageLength,
            pageTemplate: templates.author,
            buildPath: buildPaginatedPath,
            context: {
                author,
                originalPath: path,
                skip: opts.pageLength,
                limit: opts.pageLength,
            },
        })
    })
}

export const createPages = async (
    pluginApi: IPluginApi,
    themeOptions: IConfig,
) => {
    const {
        graphql,
        actions: { createPage },
    } = pluginApi
    const { basePath = '/', pageLength = 6 } = themeOptions

    const dataSources: {
        local: { authors: IAuthor[]; articles: IArticle[] }
    } = {
        local: { authors: [], articles: [] },
    }

    log('Config basePath', basePath)

    try {
        log('Querying Authors & Aritcles source:', 'Local')
        const localAuthors = await graphql(query.local.authors)
        const localArticles = await graphql(query.local.articles)

        dataSources.local.authors = localAuthors.data.authors.edges.map(
            normalize.local.authors,
        )

        dataSources.local.articles = localArticles.data.articles.edges.map(
            normalize.local.articles,
        )
    } catch (error) {
        console.error(error)
    }

    const articles = dataSources.local.articles.sort(byDateSorter)
    const authors = getUniqueListBy([...dataSources.local.authors], 'name')

    if (articles.length === 0 || authors.length === 0) {
        throw new Error(`
            You must have at least one Author and Post. As reference you can view the
            example repository. Look at the content folder in the example repo.
            https://github.com/narative/gatsby-theme-novela-example
        `)
    }

    createArticlePages({
        articles,
        authors,
        basePath,
        createPage,
        pageLength,
    })

    // createTagPages({ articlesByTag, createPage, pageLength })

    createAuthorPages({
        articles,
        authors,
        createPage,
        pageLength,
    })
}
