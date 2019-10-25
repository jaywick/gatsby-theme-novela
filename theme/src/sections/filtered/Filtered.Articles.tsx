import React from 'react'
import styled from '@emotion/styled'

import mediaqueries from '@styles/media'
import { IArticle, IWithTheme } from '@types'

import ArticlesList from '../home/Articles.List'

interface FilteredArticlesProps {
    articles: IArticle[]
}

const FilteredArticles = ({ articles }: FilteredArticlesProps) => {
    return (
        <FilteredArticlesContainer>
            <ArticlesList articles={articles} alwaysShowAllDetails />
        </FilteredArticlesContainer>
    )
}

export default FilteredArticles

const FilteredArticlesContainer = styled.div<IWithTheme>`
    background: linear-gradient(
        180deg,
        ${p => p.theme.colors.card} 0%,
        rgba(249, 250, 252, 0) 91.01%
    );
    border-radius: 8px;
    padding: 88px 98px;
    position: relative;
    z-index: 1;

    ${mediaqueries.desktop_medium`
        padding: 80px;
    `}

    ${mediaqueries.desktop`
        padding: 0;
        background: transparent;
    `}
`
