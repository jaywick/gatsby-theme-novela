import styled from '@emotion/styled'
import { css } from '@emotion/core'

import mediaqueries from '@styles/media'
import { IWithTheme } from '@types'

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = (p: IWithTheme) => css`
    font-weight: bold;
    color: ${p.theme.colors.primary};
    font-family: ${p.theme.fonts.serif};
`

export const h1 = styled.h1`
    font-size: 52px;
    line-height: 1.15;
    ${commonStyles};

    ${mediaqueries.desktop`
        font-size: 38px;
        line-height: 1.2;
    `};

    ${mediaqueries.phablet`
        font-size: 32px;
        line-height: 1.3;
    `};
`

export const h2 = styled.h2`
    font-size: 32px;
    line-height: 1.333;
    ${commonStyles};

    ${mediaqueries.desktop`
        font-size: 21px;
    `};

    ${mediaqueries.tablet`
        font-size: 24px;
        line-height: 1.45;
    `};

    ${mediaqueries.phablet`
        font-size: 22px;
    `};
`

export const h3 = styled.h3`
    font-size: 24px;
    line-height: 1.45;
    ${commonStyles};

    ${mediaqueries.tablet`
        font-size: 22px;
    `};

    ${mediaqueries.phablet`
        font-size: 20px;
    `};
`

export const h4 = styled.h4`
    font-size: 18px;
    line-height: 1.45;
    ${commonStyles};

    ${mediaqueries.phablet`
        font-size: 16px;
    `};
`

export const h5 = styled.h5`
    font-size: 18px;
    line-height: 1.45;
    ${commonStyles};

    ${mediaqueries.phablet`
        font-size: 16px;
    `};
`

export const h6 = styled.h6`
    font-size: 16px;
    line-height: 1.45;
    ${commonStyles};

    ${mediaqueries.phablet`
        font-size: 14px;
    `};
`
