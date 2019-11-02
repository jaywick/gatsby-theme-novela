import styled from '@emotion/styled'
import { IWithTheme } from '~types'

export const BioContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    left: -10px;
`

export const BioAvatar = styled.div<IWithTheme & { as?: any; to?: any }>`
    display: block;
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    margin-right: 16px;
    margin: 10px 26px 10px 10px;

    &::after {
        content: '';
        position: absolute;
        left: -5px;
        top: -5px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.25);
    }

    &[data-a11y='true']:focus::after {
        content: '';
        position: absolute;
        left: -5px;
        top: -5px;
        width: 50px;
        height: 50px;
        border: 2px solid ${p => p.theme.colors.accent};
    }
`

export const BioAvatarInner = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
    margin-right: 16px;
    overflow: hidden;
`

export const BioText = styled.div<IWithTheme>`
    max-width: 430px;
    font-weight: bold;
    line-height: 1.15;
    color: ${p => p.theme.colors.primary};
    margin-bottom: 2px;

    a {
        color: ${p => p.theme.colors.primary};
        text-decoration: underline;
    }
`

export const BioSubtitle = styled.div<IWithTheme>`
    margin-top: 2px;
    line-height: 1.15;
    color: ${p => p.theme.colors.grey};

    a {
        color: ${p => p.theme.colors.grey};
        text-decoration: underline;
    }
`

export const BioTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`
