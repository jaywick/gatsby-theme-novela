import { IArticle, IAuthor } from '@types'

const normalizeHero = (article: IArticle) => {
    let hero = { full: {}, regular: {}, narrow: {}, seo: {} }

    if (article.hero) {
        hero = {
            full: article.hero.full.fluid,
            regular: article.hero.regular.fluid,
            narrow: article.hero.narrow.fluid,
            seo: article.hero.seo.fixed,
        }
    } else {
        console.log(
            '\u001B[33m',
            `Missing hero for "${article.title || (article as any).name}"`,
        )
    }

    return hero
}

const normalizeAvatar = (author: IAuthor) => {
    let avatar = { small: {}, medium: {}, large: {} }

    if (author.avatar) {
        avatar = {
            small: author.avatar.small.fluid,
            medium: author.avatar.medium.fluid,
            large: author.avatar.large.fluid,
        }
    } else {
        console.log('\u001B[33m', `Missing avatar for "${author.name}"`)
    }

    return avatar
}

export const articles = ({ node }) => ({
    ...node,
    hero: normalizeHero(node),
})

export const tags = ({ node }) => ({
    ...node,
    hero: normalizeHero(node),
})

export const authors = ({ node }) => ({
    ...node,
    avatar: normalizeAvatar(node),
})
