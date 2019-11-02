import React from 'react'

import { SEO } from '~components/seo'
import { Layout } from '~components/layout'

import { AuthorHero } from '../sections/filtered/author-hero'
import { FilteredArticles } from '../sections/filtered/articles'
import { Section } from '~components/section'
import { Paginator } from '~components/navigation/paginator'
import { AuthorPaginator, AuthorsGradient } from './styles'

const ArticlesPage = ({ location, pageContext }) => {
    const author = pageContext.additionalContext.author
    const articles = pageContext.group

    return (
        <Layout>
            <SEO
                pathname={location.pathname}
                title={author.name}
                description={author.bio}
            />
            <Section narrow>
                <AuthorHero author={author} />
                <FilteredArticles articles={articles} />
                <AuthorPaginator>
                    <Paginator {...pageContext} />
                </AuthorPaginator>
            </Section>
            <AuthorsGradient />
        </Layout>
    )
}

export default ArticlesPage
