import React from 'react'
import { Image, Placeholder } from '@components/image'
import { IArticle } from '@types'
import {
    ArticlesListContainer,
    List,
    ArticleLink,
    Item,
    ImageContainer,
    Title,
    Excerpt,
    MetaData,
} from './styles'

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 */

interface ArticlesListProps {
    articles: IArticle[]
    alwaysShowAllDetails?: boolean
}

interface ArticlesListItemProps {
    article: IArticle
    narrow?: boolean
}

export const ArticlesList = ({
    articles,
    alwaysShowAllDetails,
}: ArticlesListProps) => {
    if (!articles) {
        return null
    }

    const hasOnlyOneArticle = articles.length === 1

    /**
     * We're taking the flat array of articles [{}, {}, {}...]
     * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
     * This makes it simpler to create the grid we want
     */
    const articlePairs = articles.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2))
        }
        return result
    }, [])

    return (
        <ArticlesListContainer alwaysShowAllDetails={alwaysShowAllDetails}>
            {articlePairs.map((ap, index) => {
                const isEven = index % 2 !== 0
                const isOdd = index % 2 !== 1

                return (
                    <List
                        key={index}
                        hasOnlyOneArticle={hasOnlyOneArticle}
                        reverse={isEven}
                    >
                        <ListItem article={ap[0]} narrow={isEven} />
                        <ListItem article={ap[1]} narrow={isOdd} />
                    </List>
                )
            })}
        </ArticlesListContainer>
    )
}

const ListItem = ({ article, narrow }: ArticlesListItemProps) => {
    if (!article) return null

    const hasOverflow = narrow && article.title.length > 35
    const imageSource = narrow ? article.hero.narrow : article.hero.regular
    const hasHeroImage =
        Object.keys(imageSource).length !== 0 &&
        imageSource.constructor === Object

    return (
        <ArticleLink to={article.link} data-a11y='false'>
            <Item>
                <ImageContainer narrow={narrow}>
                    {hasHeroImage ? (
                        <Image src={imageSource} />
                    ) : (
                        <Placeholder />
                    )}
                </ImageContainer>
                <div>
                    <Title dark hasOverflow={hasOverflow}>
                        {article.title}
                    </Title>
                    <Excerpt narrow={narrow} hasOverflow={hasOverflow}>
                        {article.excerpt}
                    </Excerpt>
                    <MetaData>
                        {article.date} · {article.timeToRead} min read
                    </MetaData>
                </div>
            </Item>
        </ArticleLink>
    )
}
