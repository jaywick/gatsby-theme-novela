import styled from '@emotion/styled'
import { IWithTheme } from '@types'
import mediaqueries from '@styles/media'

export const Wrapper = styled.p<IWithTheme>`
    line-height: 1.756;
    font-size: 18px;
    margin: 0 auto 35px;
    width: 680px;

    ${mediaqueries.desktop`
        max-width: 507px;
    `}

    ${mediaqueries.tablet`
        max-width: 486px;
        margin: 0 auto 25px;
    `};

    ${mediaqueries.phablet`
        padding: 0 20px;
    `};
`
