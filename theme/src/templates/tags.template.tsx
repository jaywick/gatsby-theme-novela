import React from 'react'
import styled from '@emotion/styled'

import Section from '@components/section'
import { SEO } from '@components/seo'
import { Layout } from '@components/layout'
import Paginator from '@components/navigation/paginator'

import TagHero from '../sections/filtered/Tag.Hero'
import FilteredArticles from '../sections/filtered/Filtered.Articles'

function TagsPage({ location, pageContext }) {
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

export default TagsPage

const AuthorsGradient = styled.div<any>`
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
