import React, { useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Section } from '~components/section'
import { Bio } from '~components/bio'
import { IAuthor } from '~types'
import { ViewTabContext } from './view-tab-context'
import {
    HeadingContainer,
    HeroHeading,
    SubheadingContainer,
    ViewTabContainer,
    ViewTab,
} from './styles'

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

interface Props {
    authors: IAuthor[]
}

export const ArticlesHero = ({ authors }: Props) => {
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
