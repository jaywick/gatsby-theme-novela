import styled from '@emotion/styled'
import { IWithTheme } from '~types'

export const Container = styled.div<IWithTheme>`
    position: relative;
    background: ${p => p.theme.colors.background};
    transition: ${p => p.theme.colorModeTransition};
    min-height: 100vh;
`
