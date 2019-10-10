import { ReactNode } from 'react'

export interface IPaginator {
    pageCount: number
    index: number
    pathPrefix: string
}

interface IGatsbyImage {
    src: string
    base64?: string
    srcWebp?: string
    srcSet?: string
    srcSetWebp?: string
    tracedSVG?: string
}

interface IGatsbyImageFluid extends IGatsbyImage {
    maxHeight: number
    maxWidth: number
}

interface IGatsbyImageFixed extends IGatsbyImage {
    height: number
    width: number
}

export interface IAuthor {
    authorsPage?: boolean
    link?: string
    featured?: boolean
    name: string
    permaLink: string
    bio: string
    social: { name: string; url: string }[]
    avatar: {
        image: IGatsbyImageFluid
        small: IGatsbyImageFluid
        large: IGatsbyImageFluid
        medium: IGatsbyImageFluid
        full: IGatsbyImageFluid
    }
}

export interface IArticle {
    permaLink: string
    title: string
    link: string
    tags: string[]
    authors: IAuthor[]
    excerpt: string
    body: string
    id: string
    hero: {
        full: IGatsbyImageFluid
        preview: IGatsbyImageFluid
        regular: IGatsbyImageFluid
        narrow: IGatsbyImageFluid
        seo: any
    }
    timeToRead: number
    date: string
    dateForSEO: string
}

interface IArticleQuery {
    edges: {
        node: IArticle
    }[]
}

export interface IProgress {
    height: number
    offset: number
    title: string
    mode: string
    onClose?: () => void
}

export interface IWithTheme {
    theme?: any
    isDark?: boolean
}
