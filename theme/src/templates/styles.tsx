import styled from '@emotion/styled'
import { IWithTheme } from '@types'
import { mediaqueries } from '@styles'
import { Section } from '@components/section'

export const AuthorsGradient = styled.div<IWithTheme>`
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

export const AuthorPaginator = styled.div`
    text-align: center;
`

export const ArticlesGradient = styled.div<IWithTheme>`
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

export const MobileControls = styled.div`
    position: relative;
    padding-top: 60px;
    transition: background 0.2s linear;
    text-align: center;

    ${mediaqueries.tablet_up`
        display: none;
    `}
`

export const ArticleBody = styled.article`
    position: relative;
    padding: 160px 0 35px;
    padding-left: 68px;
    transition: background 0.2s linear;

    ${mediaqueries.desktop`
        padding-left: 53px;
    `}

    ${mediaqueries.tablet`
        padding: 70px 0 80px;
    `}

    ${mediaqueries.phablet`
        padding: 60px 0;
    `}
`

export const NextArticle = styled(Section)`
    display: block;
`

export const FooterNext = styled.h3<IWithTheme>`
    position: relative;
    opacity: 0.25;
    margin-bottom: 100px;
    font-weight: 400;
    color: ${p => p.theme.colors.primary};

    ${mediaqueries.tablet`
        margin-bottom: 60px;
    `}

    &::after {
        content: '';
        position: absolute;
        background: ${p => p.theme.colors.grey};
        width: ${(910 / 1140) * 100}%;
        height: 1px;
        right: 0;
        top: 11px;

        ${mediaqueries.tablet`
            width: ${(600 / 1140) * 100}%;
        `}

        ${mediaqueries.phablet`
            width: ${(400 / 1140) * 100}%;
        `}

        ${mediaqueries.phone`
            width: 90px
        `}
    }
`

export const FooterSpacer = styled.div`
    margin-bottom: 65px;
`
