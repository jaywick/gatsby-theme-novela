import styled from '@emotion/styled'
import mediaqueries from '@styles/media'
import { IWithTheme } from '@types'

export const HeadCell = styled.td<IWithTheme>`
    padding: 18px 30px;
    font-size: 16px;
    background: ${p => p.theme.colors.card};

    ${mediaqueries.desktop`
        padding: 14px 20px;
    `}

    ${mediaqueries.tablet`
        font-size: 14px;
    `}
`
