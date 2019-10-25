import React, { useContext } from 'react'
import styled from '@emotion/styled'

import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'
import Paginator from '@components/Navigation/Navigation.Paginator'

import ArticlesHero from '../sections/home/Articles.Hero'
import { IWithTheme } from '@types'
import { ViewTabContext } from '../sections/home/ViewTabContext'
import { HomeList } from '../sections/home/home-list'

function ArticlesPage({ location, pageContext }) {
    const articles = pageContext.group
    const tags = [] //TODO
    const authors = pageContext.additionalContext.authors

    return (
        <Layout>
            <SEO pathname={location.pathname} />
            <ArticlesHero authors={authors} />
            <Section narrow>
                <HomeList articles={articles} tags={tags} />
                <ArticlesPaginator show={pageContext.pageCount > 1}>
                    <Paginator {...pageContext} />
                </ArticlesPaginator>
            </Section>
            <ArticlesGradient />
        </Layout>
    )
}

export default ArticlesPage

const ArticlesGradient = styled.div<IWithTheme>`
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

const ArticlesPaginator = styled.div<{ show: boolean }>`
    ${p => p.show && `margin-top: 95px;`}
`
