import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { IWithTheme } from '~types'

export const fadein = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`

export const Transition = styled.div<IWithTheme & { as: any }>`
    opacity: 0;
    animation: ${fadein} 0.3s linear forwards;
`
