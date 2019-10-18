import addToMailchimp from 'gatsby-plugin-mailchimp'
import React, { useState } from 'react'

import Section from '@components/Section'
import Headings from '@components/Headings'

import styled from '@emotion/styled'
import mediaqueries from '@styles/media'
import { IWithTheme, ITag } from '@types'
import LongArrowRight from '@styles/media'
import Icons from '@icons'
import { useColorMode, useThemeUI } from 'theme-ui'

interface Props {
    tag: ITag
}

const Tags = ({ tag }: Props) => {
    const { theme } = useThemeUI()

    return (
        <Section narrow>
            <SubscriptionContainer>
                <Content>
                    <Heading>{tag.name}</Heading>
                    <Text>{tag.story}</Text>
                    <ReadMoreLink href={`/tags/${tag.key}`}>
                        More in this series
                        <Spacer />
                        <Icons.LongArrowRight fill={theme.colors.primary} />
                    </ReadMoreLink>
                </Content>
            </SubscriptionContainer>
        </Section>
    )
}

export default Tags

const SubscriptionContainer = styled.div<{ theme?: any }>`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 64px 0 55px;
    margin: 10px auto 100px;
    background: ${p => p.theme.colors.card};
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
    z-index: 1;

    ${mediaqueries.tablet`
        padding: 50px 0 0;
        text-align: center;
    `}

    ${mediaqueries.phablet`
        margin: -20px auto 80px;
    `}
`

const Content = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 640px;

    ${mediaqueries.tablet`
        h3 {
            padding: 0 50px;
        }
    `}

    ${mediaqueries.phone`
        h3 {
            padding: 0 24px;
        }
    `}
`

const Heading = styled(Headings.h3)`
    margin-bottom: 20px;

    ${mediaqueries.tablet`
        margin-bottom: 15px;
    `}
`

const Text = styled.p<IWithTheme>`
    margin: 0 auto 30px;
    color: ${p => p.theme.colors.grey};
    line-height: 1.75;

    ${mediaqueries.tablet`
        padding: 0 26px;
        margin: 0 auto 25px;
    `}
`

const ReadMoreLink = styled.a<IWithTheme>`
    color: ${p => p.theme.colors.primary};
    font-weight: bold;
    transition: color 0.2s linear, background-color 0.2s linear;
    padding: 5px 10px;
    margin-left: -10px;
    border-radius: 20px;

    svg * {
        fill: ${p => p.theme.colors.primary};
        transition: fill 0.2s linear;
    }

    &:hover {
        color: ${p => p.theme.colors.background};
        background-color: ${p => p.theme.colors.primary};

        svg * {
            fill: ${p => p.theme.colors.background};
        }
    }
`

const Spacer = styled.span`
    width: 4px;
`
