import React, { useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import Section from '@components/section'
import { Bio } from '@components/bio'
import mediaqueries from '@styles/media'
import { IAuthor, IWithTheme } from '@types'

import { ViewTabContext } from './ViewTabContext'

const authorQuery = graphql`
    {
        site: allSite {
            edges {
                node {
                    siteMetadata {
                        hero {
                            heading
                            maxWidth
                        }
                    }
                }
            }
        }
    }
`

function ArticlesHero({ authors }: { authors: IAuthor[] }) {
    const { viewTab = 'articles', setViewTab } = useContext(ViewTabContext)

    const results = useStaticQuery(authorQuery)
    const hero = results.site.edges[0].node.siteMetadata.hero
    const articlesIsActive = viewTab === 'articles'
    const featuredAuthor = authors.find(author => author.featured)

    if (!featuredAuthor) {
        throw new Error(`
            No featured Author found.
            Please ensure you have at least featured Author.
        `)
    }

    return (
        <Section relative id='Articles__Hero'>
            <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
                <HeroHeading
                    dangerouslySetInnerHTML={{ __html: hero.heading }}
                />
            </HeadingContainer>
            <SubheadingContainer>
                <Bio author={featuredAuthor} />
                <ViewTabContainer>
                    <ViewTab
                        onClick={() => setViewTab('articles')}
                        active={articlesIsActive}
                        data-a11y='false'
                        title='Show articles in Tile grid'
                        aria-label='Show articles in Tile grid'
                    >
                        Articles
                    </ViewTab>
                    <ViewTab
                        onClick={() => setViewTab('projects')}
                        active={!articlesIsActive}
                        data-a11y='false'
                        title='Show articles in Row grid'
                        aria-label='Show articles in Row grid'
                    >
                        Projects
                    </ViewTab>
                </ViewTabContainer>
            </SubheadingContainer>
        </Section>
    )
}

export default ArticlesHero

const SubheadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;

    ${mediaqueries.desktop`
        margin-bottom: 80px;
    `};

    ${mediaqueries.tablet`
        margin-bottom: 60px;
    `};

    ${mediaqueries.phablet`
        display: none;
    `};
`

const ViewTabContainer = styled.div`
    display: flex;
    align-items: center;

    ${mediaqueries.tablet`
        display: none;
    `};
`

const HeadingContainer = styled.div`
    margin: 100px 0;

    ${mediaqueries.desktop`
        width: 80%;
    `}

    ${mediaqueries.tablet`
        width: 100%;
    `}
`

const HeroHeading = styled.h1<IWithTheme>`
    font-style: normal;
    font-weight: 600;
    font-size: 52px;
    line-height: 1.15;
    color: ${p => p.theme.colors.primary};

    a {
        color: ${p => p.theme.colors.accent};
    }

    ${mediaqueries.desktop`
        font-size: 38px
    `}

    ${mediaqueries.phablet`
        font-size: 32px;
    `}
`

const GridButton = styled.button<{ active: boolean } & IWithTheme>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background: transparent;
    transition: background 0.25s;

    &:not(:last-child) {
        margin-right: 30px;
    }

    &:hover {
        background: ${p => p.theme.colors.hover};
    }

    &[data-a11y='true']:focus::after {
        content: '';
        position: absolute;
        left: -10%;
        top: -10%;
        width: 120%;
        height: 120%;
        border: 2px solid ${p => p.theme.colors.accent};
        background: rgba(255, 255, 255, 0.01);
        border-radius: 50%;
    }

    svg {
        opacity: ${p => (p.active ? 1 : 0.25)};
        transition: opacity 0.2s;

        path {
            fill: ${p => p.theme.colors.primary};
        }
    }
`

const ViewTab = styled.button<{ active: boolean } & IWithTheme>`
    max-width: 430px;
    font-weight: bold;
    line-height: 1.15;
    color: ${p => p.theme.colors.primary};
    margin-bottom: 2px;

    a {
        color: ${p => p.theme.colors.primary};
    }

    &:not(:last-child) {
        margin-right: 30px;
    }

    background-image: linear-gradient(120deg, white 0%, white 100%);
    background-repeat: no-repeat;
    background-size: ${p => (p.active ? '75%' : '0')} 0.2em;
    background-position: 50% 100%;
    padding: 6px 0;
    transition: background 100ms ease-in;

    &:hover {
        background-image: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.5) 100%
        );
        background-size: ${p => (p.active ? '75%' : '66%')} 0.2em;
    }

    &[data-a11y='true']:focus::after {
        content: '';
        position: absolute;
        left: -10%;
        top: -10%;
        width: 120%;
        height: 120%;
        border: 2px solid ${p => p.theme.colors.accent};
        background: rgba(255, 255, 255, 0.01);
        border-radius: 50%;
    }
`
