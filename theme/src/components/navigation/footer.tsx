import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Section } from '~components/section'
import { SocialLinks } from '~components/social-links'
import {
    FooterGradient,
    HoritzontalRule,
    FooterContainer,
    FooterText,
} from './styles'

const siteQuery = graphql`
    {
        allSite {
            edges {
                node {
                    siteMetadata {
                        name
                        social {
                            url
                        }
                    }
                }
            }
        }
    }
`

export const Footer = () => {
    const results = useStaticQuery(siteQuery)
    const { name, social } = results.allSite.edges[0].node.siteMetadata

    return (
        <>
            <FooterGradient />
            <Section narrow>
                <HoritzontalRule />
                <FooterContainer>
                    <FooterText>
                        © {new Date().getFullYear()} {name}
                    </FooterText>
                    <div>
                        <SocialLinks links={social} />
                    </div>
                </FooterContainer>
            </Section>
        </>
    )
}
