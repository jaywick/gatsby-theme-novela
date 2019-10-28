import styled from '@emotion/styled'
import { IWithTheme } from '@types'
import { mediaqueries } from '@styles/media'

export const FooterContainer = styled.div<IWithTheme>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 80px;
    color: ${p => p.theme.colors.grey};

    ${mediaqueries.tablet`
        flex-direction: column;
        padding-bottom: 100px;
    `}

    ${mediaqueries.phablet`
        padding-bottom: 50px;
    `}
`

export const HoritzontalRule = styled.div<IWithTheme>`
    position: relative;
    margin: 140px auto 50px;
    border-bottom: 1px solid ${p => p.theme.colors.horizontalRule};

    ${mediaqueries.tablet`
        margin: 60px auto;
    `}

    ${mediaqueries.phablet`
        display: none;
    `}
`

export const FooterText = styled.div`
    ${mediaqueries.tablet`
        margin-bottom: 80px;
    `}

    ${mediaqueries.phablet`
        margin: 120px auto 100px;
    `}
`

export const FooterGradient = styled.div<IWithTheme>`
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
