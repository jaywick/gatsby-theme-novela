import React, { useContext } from 'react'

import { Section } from '@components/section'
import { SEO } from '@components/seo'
import { Layout } from '@components/layout'

import { ArticlesHero } from '../sections/home/articles-hero'
import { HomeList } from '../sections/home/home-list'
import { ArticlesGradient } from './styles'

const ArticlesPage = ({ location, pageContext }) => {
    const authors = pageContext.additionalContext.authors

    return (
        <Layout>
            <SEO pathname={location.pathname} />
            <ArticlesHero authors={authors} />
            <Section narrow>
                <HomeList pageContext={pageContext} />
            </Section>
            <ArticlesGradient />
        </Layout>
    )
}

export default ArticlesPage
