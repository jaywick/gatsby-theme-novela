import styled from '@emotion/styled'
import { IWithTheme } from '@types'
import { mediaqueries } from '@styles/media'

export const Hero = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 35px auto 110px;
`

export const HeroImage = styled.div<IWithTheme>`
    position: relative;
    z-index: 1;
    height: 164px;
    width: 164px;
    margin-bottom: 35px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid ${p => p.theme.colors.background};
    box-shadow: 0px 15.619px 31.2381px rgba(0, 0, 0, 0.15);

    ${mediaqueries.tablet`
        width: 146px;
        height: 146px;
    `}

    ${mediaqueries.phablet`
        width: 136px;
        height: 136px;
        margin-bottom: 25px;
    `}
`

export const Heading = styled.h1<IWithTheme>`
    font-size: 38px;
    font-family: ${p => p.theme.fonts.sansSerif};
    color: ${p => p.theme.colors.primary};
    margin-bottom: 15px;
    font-weight: 600;
`

export const Subheading = styled.p<IWithTheme>`
    margin: 0 auto;
    max-width: 450px;
    color: ${p => p.theme.colors.grey};
    font-size: 18px;
    font-family: ${p => p.theme.fonts.sansSerif};
    line-height: 1.4;
    text-align: center;

    ${mediaqueries.phablet`
        font-size: 14px;
    `}
`

export const Social = styled.div`
    display: flex;
    align-items: center;
    margin-top: 35px;

    ${mediaqueries.phablet`
        font-size: 14px;
    `}
`

export const FilteredArticlesContainer = styled.div<IWithTheme>`
    background: linear-gradient(
        180deg,
        ${p => p.theme.colors.card} 0%,
        rgba(249, 250, 252, 0) 91.01%
    );
    border-radius: 8px;
    padding: 88px 98px;
    position: relative;
    z-index: 1;

    ${mediaqueries.desktop_medium`
        padding: 80px;
    `}

    ${mediaqueries.desktop`
        padding: 0;
        background: transparent;
    `}
`
