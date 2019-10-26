import React, { useContext } from 'react'
import styled from '@emotion/styled'

import Section from '@components/Section'
import SEO from '@components/SEO'
import Layout from '@components/Layout'

import ArticlesHero from '../sections/home/Articles.Hero'
import { IWithTheme } from '@types'
import { HomeList } from '../sections/home/home-list'
import { ViewTabContext } from '../sections/home/ViewTabContext'

function ArticlesPage({ location, pageContext }) {
    const authors = pageContext.additionalContext.authors

    const { viewTab } = useContext(ViewTabContext)
    console.log(viewTab)

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
