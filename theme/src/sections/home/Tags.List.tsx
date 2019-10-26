import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import Headings from '@components/Headings'
import Image, { ImagePlaceholder } from '@components/Image'

import mediaqueries from '@styles/media'
import { ITag, IWithTheme } from '@types'

interface TagsListProps {
    tags: ITag[]
    alwaysShowAllDetails?: boolean
}

interface TagsListItemProps {
    tag: ITag
    narrow?: boolean
}

export const TagsList = ({ tags, alwaysShowAllDetails }: TagsListProps) => {
    if (!tags) {
        return null
    }

    const hasOnlyOneTag = tags.length === 1

    /**
     * We're taking the flat array of tags [{}, {}, {}...]
     * and turning it into an array of pairs of tags [[{}, {}], [{}, {}], [{}, {}]...]
     * This makes it simpler to create the grid we want
     */
    const tagPairs = tags.reduce((result, value, index, array) => {
        if (index % 2 === 0) {
            result.push(array.slice(index, index + 2))
        }
        return result
    }, [])

    return (
        <TagsListContainer alwaysShowAllDetails={alwaysShowAllDetails}>
            {tagPairs.map((ap, index) => {
                const isEven = index % 2 !== 0
                const isOdd = index % 2 !== 1

                return (
                    <List
                        key={index}
                        hasOnlyOneTag={hasOnlyOneTag}
                        reverse={isEven}
                    >
                        <ListItem tag={ap[0]} narrow={isEven} />
                        <ListItem tag={ap[1]} narrow={isOdd} />
                    </List>
                )
            })}
        </TagsListContainer>
    )
}

const ListItem = ({ tag, narrow }: TagsListItemProps) => {
    if (!tag) return null

    const hasOverflow = narrow && tag.name.length > 35
    const imageSource = narrow ? tag.hero.narrow : tag.hero.regular
    const hasAvatarImage =
        typeof imageSource === 'object' && Object.keys(imageSource).length !== 0

    return (
        <ArticleLink to={tag.link} data-a11y='false'>
            <Item>
                <ImageContainer narrow={narrow}>
                    {hasAvatarImage ? (
                        <Image src={imageSource} />
                    ) : (
                        <ImagePlaceholder />
                    )}
                </ImageContainer>
                <div>
                    <Title dark hasOverflow={hasOverflow}>
                        {tag.name}
                    </Title>
                    <Excerpt narrow={narrow} hasOverflow={hasOverflow}>
                        {tag.story}
                    </Excerpt>
                </div>
            </Item>
        </ArticleLink>
    )
}

const limitToTwoLines = css`
    text-overflow: ellipsis;
    overflow-wrap: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    white-space: normal;
    overflow: hidden;

    ${mediaqueries.phablet`
        -webkit-line-clamp: 3;
    `}
`

const showDetails = css`
    p {
        display: -webkit-box;
    }

    h2 {
        margin-bottom: 10px;
    }
`

const TagsListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
    transition: opacity 0.25s;
    ${p => p.alwaysShowAllDetails && showDetails}
`

const listItemRow = p => css`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 488px;
    grid-column-gap: 96px;
    grid-template-rows: 1;
    align-items: center;
    position: relative;
    margin-bottom: 50px;

    ${mediaqueries.desktop`
        grid-column-gap: 24px;
        grid-template-columns: 1fr 380px;
    `}

    ${mediaqueries.tablet`
        grid-template-columns: 1fr;
    `}

    @media (max-width: 540px) {
        background: ${p.theme.colors.card};
    }

    ${mediaqueries.phablet`
        box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    `}
`

const List = styled.div<{
    reverse: boolean
    hasOnlyOneTag: boolean
}>`
    display: grid;
    grid-template-rows: ${p => (p.hasOnlyOneTag ? '1fr' : '1fr 1fr')};
`

const Item = styled.div`
    ${listItemRow}
`

const ImageContainer = styled.div<{ narrow: boolean }>`
    position: relative;
    height: 220px;
    box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
        0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
    margin-bottom: 30px;
    transition: transform 0.3s var(--ease-out-quad),
        box-shadow 0.3s var(--ease-out-quad);

    & > div {
        height: 100%;
    }

    ${mediaqueries.tablet`
        height: 200px;
        margin-bottom: 35px;
    `}

    ${mediaqueries.phablet`
        overflow: hidden;
        margin-bottom: 0;
        box-shadow: none;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    `}
`

const Title = styled(Headings.h2)`
    font-size: 21px;
    font-family: ${p => (p.theme as any).fonts.serif};
    margin-bottom: ${p => (p.hasOverflow ? '35px' : '10px')};
    transition: color 0.3s ease-in-out;
    ${limitToTwoLines};

    ${mediaqueries.desktop`
        margin-bottom: 15px;
    `}

    ${mediaqueries.tablet`
        font-size: 24px;  
    `}

    ${mediaqueries.phablet`
        font-size: 22px;  
        padding: 30px 20px 0;
        margin-bottom: 10px;
        -webkit-line-clamp: 3;
    `}
`

const Excerpt = styled.p<
    {
        hasOverflow: boolean
        narrow: boolean
    } & IWithTheme
>`
    ${limitToTwoLines};
    font-size: 16px;
    margin-bottom: 10px;
    color: ${p => p.theme.colors.grey};
    display: ${p => (p.hasOverflow ? 'none' : 'box')};
    max-width: ${p => (p.narrow ? '415px' : '515px')};

    ${mediaqueries.desktop`
        display: -webkit-box;
    `}

    ${mediaqueries.phablet`
        margin-bottom; 15px;
    `}

    ${mediaqueries.phablet`
        max-width: 100%;
        padding:  0 20px;
        margin-bottom: 20px;
        -webkit-line-clamp: 3;
    `}
`

const ArticleLink = styled<any>(Link)`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 5px;
    z-index: 1;
    transition: transform 0.33s var(--ease-out-quart);
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

    &:hover ${ImageContainer}, &:focus ${ImageContainer} {
        transform: translateY(-1px);
        box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
            0 30px 50px -30px rgba(0, 0, 0, 0.3);
    }

    &:hover h2,
    &:focus h2 {
        color: ${p => (p.theme as any).colors.accent};
    }

    &[data-a11y='true']:focus::after {
        content: '';
        position: absolute;
        left: -1.5%;
        top: -2%;
        width: 103%;
        height: 104%;
        border: 3px solid ${p => (p.theme as any).colors.accent};
        background: rgba(255, 255, 255, 0.01);
        border-radius: 5px;
    }

    ${mediaqueries.phablet`
        &:hover ${ImageContainer} {
            transform: none;
            box-shadow: initial;
        }

        &:active {
            transform: scale(0.97) translateY(3px);
        }
    `}
`
