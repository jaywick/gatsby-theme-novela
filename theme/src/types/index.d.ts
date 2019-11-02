import { ReactNode } from 'react'
import { NodePluginArgs } from 'gatsby'
import { Node } from 'gatsby'
import { IColors } from '../gatsby-plugin-theme-ui'

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

interface IGatsbyImageFixed extends IGatsbyImage {
    maxHeight: number
    maxWidth: number
    fixed: any
}

interface IGatsbyImageFluid extends IGatsbyImage {
    maxHeight: number
    maxWidth: number
    fluid: any
}

interface IGatsbyImageFixed extends IGatsbyImage {
    height: number
    width: number
}

interface IHeroImage {
    full: IGatsbyImageFluid
    preview: IGatsbyImageFluid
    regular: IGatsbyImageFluid
    narrow: IGatsbyImageFluid
    seo: IGatsbyImageFixed
}

interface IAvatarImage {
    large: IGatsbyImageFluid
    medium: IGatsbyImageFluid
    small: IGatsbyImageFluid
}

export interface IAuthor {
    authorsPage?: boolean
    link?: string
    featured?: boolean
    name: string
    permaLink: string
    bio: string
    social: { name: string; url: string }[]
    avatar: IAvatarImage
}

export interface IArticle {
    permaLink: string
    title: string
    link: string
    tag: string
    author: string
    authors: IAuthor[]
    excerpt: string
    body: string
    id: string
    hero: IHeroImage
    timeToRead: number
    date: string
    dateForSEO: string
}

export interface ITag {
    key: string
    name: string
    story: string
    link: string
    hero: IHeroImage
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
    theme?: { [key: string]: any } & { colors: IColors }
    isDark?: boolean
}

export interface IConfig {
    remotePosts: {
        name: string
        // URL to the remote git repository
        remote: string
        // Glob pattern(s) to find content
        patterns: string | string[]
        // Optionally path to a folder, which if set, bypasses git and uses that local folder relative to the www package
        bypassGitWithLocalTestFolder?: string
    }
    contentPath: string
    contentAuthors: string
    basePath: string
    authorsPage: boolean
    pageLength: number
}

export interface IPluginApi<TNode extends Node> extends NodePluginArgs {
    node: TNode
    graphql: (query: string) => Promise<{ data: any }>
}

export interface IMdxNode extends Node {
    frontmatter: { [key: string]: any }
    rawBody: string
}

export interface IFileNode extends Node {
    absolutePath: string
    accessTime: string
    atime: string
    atimeMs: number
    base: string
    birthTime: string
    birthtime: string
    birthtimeMs: number
    blksize: number
    blocks: number
    changeTime: string
    uid: number
    sourceInstanceName: string
    size: number
    root: string
    relativePath: string
    relativeDirectory: string
    rdev: number
    publicURL: string
    prettySize: string
    nlink: number
    mtimeMs: number
    mtime: string
    name: string
    modifiedTime: string
    mode: number
    ino: number
    id: string
    gid: number
    extension: string
    ext: string
    dir: string
    dev: number
    ctimeMs: number
    ctime: string
}
