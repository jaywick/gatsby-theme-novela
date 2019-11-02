import React, { useRef, useState, useEffect } from 'react'
import { throttle } from 'lodash'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '~components/layout'
import { MDX } from '~components/mdx'
import { Progress } from '~components/progress'
import { debounce } from '~utils'

import { ArticleAside } from '../sections/article/aside'
import { ArticleHero } from '../sections/article/hero'
import { ArticleControls } from '../sections/article/controls'
import { ArticlesNext } from '../sections/article/next'
import { ArticleSEO } from '../sections/article/seo'
import { ArticleShare } from '../sections/article/share'
import { IArticle, IAuthor, ITag } from '~types'
import { Tags } from '~components/tags'
import {
    MobileControls,
    ArticleBody,
    NextArticle,
    FooterNext,
    FooterSpacer,
} from './styles'

interface TemplateProps {
    pageContext: {
        article: IArticle
        authors: IAuthor[]
        tag: ITag
        next: any
    }
    location: any
}

const siteQuery = graphql`
    {
        allSite {
            edges {
                node {
                    siteMetadata {
                        name
                    }
                }
            }
        }
    }
`

const Article = ({ pageContext, location }: TemplateProps) => {
    const contentSectionRef = useRef<HTMLElement>(null)

    const [hasCalculated, setHasCalculated] = useState<boolean>(false)
    const [contentHeight, setContentHeight] = useState<number>(0)

    const results = useStaticQuery(siteQuery)
    const name = results.allSite.edges[0].node.siteMetadata.name

    const { article, authors, tag, next } = pageContext

    useEffect(() => {
        const calculateBodySize = throttle(() => {
            const contentSection = contentSectionRef.current

            if (!contentSection) return

            /**
             * If we haven't checked the content's height before,
             * we want to add listeners to the content area's
             * imagery to recheck when it's loaded
             */
            if (!hasCalculated) {
                const debouncedCalculation = debounce(calculateBodySize)
                const $imgs = contentSection.querySelectorAll('img')

                $imgs.forEach($img => {
                    // If the image hasn't finished loading then add a listener
                    if (!$img.complete) $img.onload = debouncedCalculation
                })

                // Prevent rerun of the listener attachment
                setHasCalculated(true)
            }

            // Set the height and offset of the content area
            setContentHeight(contentSection.getBoundingClientRect().height)
        }, 20)

        calculateBodySize()
        window.addEventListener('resize', calculateBodySize)

        return () => window.removeEventListener('resize', calculateBodySize)
    }, [])

    return (
        <Layout>
            <ArticleSEO
                article={article}
                authors={authors}
                location={location}
            />
            <ArticleHero article={article} authors={authors} />
            <ArticleAside contentHeight={contentHeight}>
                <Progress contentHeight={contentHeight} />
            </ArticleAside>
            <MobileControls>
                <ArticleControls />
            </MobileControls>
            <ArticleBody ref={contentSectionRef}>
                <MDX content={article.body}>
                    <ArticleShare />
                </MDX>
            </ArticleBody>
            {tag && <Tags tag={tag} />}
            {next.length > 0 && (
                <NextArticle narrow>
                    <FooterNext>More articles from {name}</FooterNext>
                    <ArticlesNext articles={next} />
                    <FooterSpacer />
                </NextArticle>
            )}
        </Layout>
    )
}

export default Article
