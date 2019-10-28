import React from 'react'

import { Section } from '@components/section'
import { Layout } from '@components/layout'
import { Paginator } from '@components/navigation/paginator'

import { TagHero } from '../sections/filtered/tag-hero'
import { FilteredArticles } from '../sections/filtered/articles'
import { AuthorPaginator, AuthorsGradient } from './styles'

export const TagsPage = ({ location, pageContext }) => {
    const tag = pageContext.additionalContext.tag
    const articles = pageContext.group

    return (
        <Layout>
            <Section narrow>
                <TagHero tag={tag} />
                <FilteredArticles articles={articles} />
                <AuthorPaginator>
                    <Paginator {...pageContext} />
                </AuthorPaginator>
            </Section>
            <AuthorsGradient />
        </Layout>
    )
}
