import { ArticlesList } from './articles-list'
import { Paginator } from '@components/navigation/paginator'
import React, { useContext } from 'react'
import { TagsList } from './tags-list'
import { IArticle, ITag, IPaginator } from '@types'
import { ViewTabContext } from './view-tab-context'
import styled from '@emotion/styled'

interface Props {
    pageContext: {
        group: IArticle[]
        additionalContext: {
            tags: ITag[]
        }
    } & IPaginator
}

export const HomeList = ({ pageContext }: Props) => {
    const articles = pageContext.group
    const tags = pageContext.additionalContext.tags
    const { viewTab } = useContext(ViewTabContext)

    return viewTab === 'articles' ? (
        <>
            <ArticlesList articles={articles} />
            <ArticlesPaginator show={pageContext.pageCount > 1}>
                <Paginator {...pageContext} />
            </ArticlesPaginator>
        </>
    ) : (
        <TagsList tags={tags} />
    )
}

const ArticlesPaginator = styled.div<{ show: boolean }>`
    ${p => p.show && `margin-top: 95px;`}
`
