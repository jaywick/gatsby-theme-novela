import ArticlesList from './Articles.List'
import React, { useContext } from 'react'
import TagsList from './Tags.List'
import { IArticle, ITag } from '@types'
import { ViewTabContext } from './ViewTabContext'

interface Props {
    articles: IArticle[]
    tags: ITag[]
}

export const HomeList = (props: Props) => {
    const { viewTab } = useContext(ViewTabContext)

    return viewTab === 'articles' ? (
        <ArticlesList articles={props.articles} />
    ) : (
        <TagsList tags={props.tags} />
    )
}
