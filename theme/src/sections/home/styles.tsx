import { mediaqueries } from '~styles/media'
import styled from '@emotion/styled'
import { IWithTheme } from '~types'
import { Link } from 'gatsby'
import { h2 } from '~components/headings'
import { css } from '@emotion/core'

export const SubheadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;

    ${mediaqueries.tablet`
        /* flex-direction: column; */
    `};

    ${mediaqueries.desktop`
        margin-bottom: 80px;
    `};

    ${mediaqueries.tablet`
        margin-bottom: 60px;
    `};
`

export const ViewTabContainer = styled.div`
    display: flex;
    align-items: center;
`

export const HeadingContainer = styled.div`
    margin: 100px 0;

    ${mediaqueries.desktop`
        width: 80%;
    `}

    ${mediaqueries.tablet`
        width: 100%;
    `}
`

export const HeroHeading = styled.h1<IWithTheme>`
    font-weight: bold;
    font-size: 6rem;
    font-style: normal;
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

export const HeroSubheading = styled.h2<IWithTheme>`
    font-size: 3rem;
    font-style: normal;
    font-weight: 250;
    line-height: 1.15;
    margin-top: 1rem;
    opacity: 0.5;
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

export const GridButton = styled.button<{ active: boolean } & IWithTheme>`
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

export const ViewTab = styled.button<{ active: boolean } & IWithTheme>`
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

    background-image: ${p =>
        `linear-gradient(120deg, ${p.theme.colors.primary} 0%, ${p.theme.colors.primary} 100%)`};
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

const wide = '1fr'
const narrow = '457px'

export const limitToTwoLines = css`
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

export const showDetails = css`
    p {
        display: -webkit-box;
    }

    h2 {
        margin-bottom: 10px;
    }
`

export const ArticlesListContainer = styled.div<{
    alwaysShowAllDetails?: boolean
}>`
    transition: opacity 0.25s;
    ${p => p.alwaysShowAllDetails && showDetails}
`

export const listTile = p => css`
    position: relative;
    display: grid;
    grid-template-columns: ${p.reverse
        ? `${narrow} ${wide}`
        : `${wide} ${narrow}`};
    grid-template-rows: 2;
    column-gap: 30px;

    &:not(:last-child) {
        margin-bottom: 75px;
    }

    ${mediaqueries.desktop_medium`
        grid-template-columns: 1fr 1fr;
    `}

    ${mediaqueries.tablet`
        grid-template-columns: 1fr;
        
        &:not(:last-child) {
        margin-bottom: 0;
        }
    `}
`

export const listItemRow = p => css`
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

export const listItemTile = p => css`
    position: relative;

    ${mediaqueries.tablet`
        margin-bottom: 60px;
    `}

    @media (max-width: 540px) {
        background: ${p.theme.colors.card};
    }

    ${mediaqueries.phablet`
        margin-bottom: 40px;
        box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    `}
`

// If only 1 article, dont create 2 rows.
export const listRow = p => css`
    display: grid;
    grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`

export const List = styled.div<{
    reverse: boolean
    hasOnlyOneArticle: boolean
}>`
    ${listTile}
`

export const Item = styled.div`
    ${listItemTile}
`

export const ImageContainer = styled.div<{ narrow: boolean }>`
    position: relative;
    height: 280px;
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

export const Title = styled(h2)<
    {
        dark?: boolean
        hasOverflow: boolean
    } & IWithTheme
>`
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

export const Excerpt = styled.p<
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

export const MetaData = styled.div<IWithTheme>`
    font-weight: 600;
    font-size: 16px;
    color: ${p => p.theme.colors.grey};
    opacity: 0.33;

    ${mediaqueries.phablet`
        max-width: 100%;
        padding:  0 20px 30px;
    `}
`

export const ArticleLink = styled<any>(Link)`
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
