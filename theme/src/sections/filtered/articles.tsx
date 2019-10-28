import React from 'react'
import { IArticle } from '@types'
import { ArticlesList } from '../home/articles-list'
import { FilteredArticlesContainer } from './styles'

interface FilteredArticlesProps {
    articles: IArticle[]
}

export const FilteredArticles = ({ articles }: FilteredArticlesProps) => {
    return (
        <FilteredArticlesContainer>
            <ArticlesList articles={articles} alwaysShowAllDetails />
        </FilteredArticlesContainer>
    )
}
