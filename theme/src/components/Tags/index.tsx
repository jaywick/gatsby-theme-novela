import React, { Component } from 'react'

import Section from '@components/Section'
import Headings from '@components/Headings'

import styled from '@emotion/styled'
import mediaqueries from '@styles/media'
import { IWithTheme } from '@types'

interface Props {
    tag: string
}

const Tags = ({ tag }: Props) => {
    return (
        <Section narrow>
            <TagsContainer>
                <Content>
                    <Text>
                        Tagged under{' '}
                        <TagList>
                            <Tag href={`/tags/${tag}`}>{tag}</Tag>
                        </TagList>
                    </Text>
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

const Tag = styled.a<IWithTheme>`
    cursor: pointer;
    padding: 4px 15px;
    margin: 0 5px;
    border: 1px solid ${p => p.theme.colors.accent};
    color: ${p => p.theme.colors.accent};
    background: transparent;
    font-weight: 600;
    border-radius: 35px;
    letter-spacing: 0.42px;
    transition: border-color 0.2s var(--ease-in-out-quad),
        background 0.2s var(--ease-in-out-quad),
        color 0.2s var(--ease-in-out-quad);

    &:hover {
        background: ${p => p.theme.colors.accent};
        color: ${p => p.theme.colors.background};
    }

    &[disabled] {
        cursor: not-allowed;
    }

    svg * {
        fill: ${p => p.theme.colors.background};
    }

    ${p => mediaqueries.tablet`
        position: relative;
        height: 60px;
        width: 100%;
        top: 0;
        left: 0;
        border: none;
        border-radius: 0;
        border-top: 1px solid ${p.theme.colors.horizontalRule};

        &:hover {
            color: initial;
            background: initial;
        }
    `}
`

const TagList = styled.span``
