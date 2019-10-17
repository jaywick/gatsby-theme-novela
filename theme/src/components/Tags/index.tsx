import React, { Component } from 'react'

import Section from '@components/Section'
import Headings from '@components/Headings'

import styled from '@emotion/styled'
import mediaqueries from '@styles/media'

interface Props {
    tags: string[]
}

const Tags = ({ tags }: Props) => {
    return (
        <Section narrow>
            <TagsContainer>
                <Content>
                    <Text>Tagged under {tags.join(', ')}</Text>
                </Content>
            </TagsContainer>
        </Section>
    )
}

export default Tags

const TagsContainer = styled.div<{ theme?: any }>`
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

const Text = styled.p<{ theme?: any }>`
    margin: 0 auto 30px;
    color: ${p => p.theme.colors.grey};
    line-height: 1.75;

    ${mediaqueries.tablet`
        padding: 0 26px;
        margin: 0 auto 25px;
    `}
`
