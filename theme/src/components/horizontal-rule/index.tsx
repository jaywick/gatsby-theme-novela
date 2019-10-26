import styled from '@emotion/styled'
import mediaqueries from '@styles/media'
import { IWithTheme } from '@types'
import { darkHr, lightHr } from './svg'

export const HorizontalRule = styled.hr<IWithTheme>`
    position: relative;
    width: 100%;
    max-width: 680px;
    margin: 50px auto;
    border: 0;
    height: 14.36px;
    background-image: url("${p => (p.isDark ? darkHr : lightHr)}");
    background-repeat: repeat-x;
    box-sizing: border-box;
    background-position: center;

    ${mediaqueries.desktop`
        max-width: 507px;
    `}

    ${mediaqueries.tablet`
        max-width: 486px;
    `};

    ${mediaqueries.phablet`
        padding: 0 20px;
    `};

    ${mediaqueries.tablet`
        width: calc(100vw - 40px);
        margin: 0px auto 50px;
    `};
`
