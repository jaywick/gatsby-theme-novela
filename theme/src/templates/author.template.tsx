import React from 'react'
import styled from '@emotion/styled'

import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'
import Paginator from '@components/Navigation/Navigation.Paginator'

import AuthorHero from '../sections/filtered/Author.Hero'
import FilteredArticles from '../sections/filtered/Filtered.Articles'
import { IWithTheme } from '@types'

function ArticlesPage({ location, pageContext }) {
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

const AuthorsGradient = styled.div<IWithTheme>`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 590px;
    z-index: 0;
    pointer-events: none;
    background: ${p => p.theme.colors.gradient};
    transition: ${p => p.theme.colorModeTransition};
`

const AuthorPaginator = styled.div`
    text-align: center;
`
