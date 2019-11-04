import styled from '@emotion/styled'
import { mediaqueries } from '~styles/media'
import { IWithTheme } from '~types'

export const SocialIconContainer = styled.a<IWithTheme>`
    position: relative;
    margin-left: 3.2rem;
    text-decoration: none;
    max-width: 16px;

    &:hover {
        svg {
            &:hover * {
                fill: ${p => p.theme.colors.primary};
            }
            * {
                transition: fill 0.25s var(--ease-in-out-quad);
            }
        }
    }

    &:first-of-type {
        margin-left: 0;
    }

    &:last-child {
        margin-right: 0;
    }

    &[data-a11y='true']:focus::after {
        content: '';
        position: absolute;
        left: -50%;
        top: -20%;
        width: 200%;
        height: 160%;
        border: 2px solid ${p => p.theme.colors.accent};
        background: rgba(255, 255, 255, 0.01);
        border-radius: 5px;
    }
`

export const Hidden = styled.span`
    width: 0px;
    height: 0px;
    visibility: hidden;
    opacity: 0;
    overflow: hidden;
    display: inline-block;
`
