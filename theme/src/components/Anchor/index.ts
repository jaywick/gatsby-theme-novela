import styled from '@emotion/styled'
import { IWithTheme } from '@types'

export const Anchor = styled.a<IWithTheme>`
    transition: ${p => p.theme.colorModeTransition};
    color: ${p => p.theme.colors.accent};

    &:visited {
        color: ${p => p.theme.colors.accent};
        opacity: 0.85;
    }

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`
