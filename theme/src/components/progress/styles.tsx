import styled from '@emotion/styled'
import { IWithTheme } from '@types'

export const ProgressContainer = styled.div`
    position: relative;
    outline: none;
    user-select: none;
`

export const Trackline = styled.div<IWithTheme>`
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(88vh - 40px);
    max-height: 425px;
    width: 1px;
    background-color: ${p => p.theme.colors.track};
    opacity: 0.6;
    overflow: hidden;
`

export const ProgressLine = styled.div<IWithTheme>`
    position: absolute;
    height: 100%;
    top: -100%;
    width: 1px;
    background-color: ${p => p.theme.colors.progress};
    left: 0;
`
