import { memo } from 'react'
import { mediaqueries } from '@styles/media'
import styled from '@emotion/styled'
import { IWithTheme } from '@types'
import { keyframes } from '@emotion/core'

/**
 * Values we get to be able to ensure the positionting context are correct!
 * Padding is derviced from the CSS value in Editor
 */
export const MENU_WIDTH: number = 225
export const MENU_HEIGHT: number = 46

export const AsideContainer = styled.aside`
    display: flex;
    margin: 0 auto;
    max-width: 1140px;

    ${mediaqueries.desktop_medium`
        display: none;
    `}
`

export const Align = memo(styled.div<{
    show: boolean
    shouldFixAside: boolean
    imageOffset: number
}>`
    position: ${p => (p.shouldFixAside ? 'fixed' : 'absolute')};
    display: flex;
    transform: translateY(0px);
    top: ${p => (p.shouldFixAside ? 0 : p.imageOffset)}px;
    align-items: ${p => (p.shouldFixAside ? 'center' : 'flex-start')};
    height: 100vh;
    z-index: 3;

    opacity: ${p => (p.show ? 1 : 0)};
    visibility: ${p => (p.show ? 'visible' : 'hidden')};
    transition: ${p =>
        p.show
            ? 'opacity 0.4s linear, visibility 0.4s linear'
            : 'opacity 0.2s linear, visibility 0.4s linear'};
`)

export const AuthorAvatar = styled.div<IWithTheme>`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    margin-right: 14px;
    background: ${p => p.theme.colors.grey};
    overflow: hidden;

    .gatsby-image-wrapper > div {
        padding-bottom: 100% !important;
    }

    ${mediaqueries.phablet`
        display: none;
    `}
`

export const AuthorLink = styled.div<IWithTheme & { as?: any; to?: any }>`
    display: flex;
    align-items: center;
    color: inherit;

    strong {
        transition: ${p => p.theme.colorModeTransition};
    }

    &:hover strong {
        color: ${p => p.theme.colors.primary};
    }
`

export const CoAuthorsList = styled.div`
    position: relative;
    height: 25px;
    margin-right: 15px;

    ${mediaqueries.phablet`
        display: none;
    `}
`

export const CoAuthorsListOpen = styled.ul<IWithTheme>`
    position: absolute;
    z-index: 2;
    left: -21px;
    right: -21px;
    top: -19px;
    padding: 21px;
    background: ${p => p.theme.colors.card};
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    cursor: pointer;
    list-style: none;
    transform: translateY(-2px);
`

export const CoAuthorsListItemOpen = styled.li`
    a {
        width: 100%;
    }

    &:not(:last-child) {
        margin-bottom: 10px;
    }
`

export const CoAuthorAvatarOpen = styled.div<IWithTheme>`
    height: 25px;
    width: 25px;
    border-radius: 50%;
    margin-right: 15px;
    background: ${p => p.theme.colors.grey};
    overflow: hidden;
    pointer-events: none;

    .gatsby-image-wrapper > div {
        padding-bottom: 100% !important;
        overflow: hidden;
    }
`

export const CoAuthorAvatar = styled.div<IWithTheme>`
    position: absolute;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    z-index: 1;
    background: ${p => p.theme.colors.grey};
    box-shadow: 0 0 0 2px ${p => p.theme.colors.background};
    transition: box-shadow 0.25s ease;
    overflow: hidden;
    pointer-events: none;

    .gatsby-image-wrapper > div {
        padding-bottom: 100% !important;
        overflow: hidden;
    }

    ${mediaqueries.phablet`
        display: none;
    `}
`

export const NameContainer = styled.strong`
    position: relative;
    max-width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    cursor: pointer;

    ${mediaqueries.desktop`
        max-width: 120px;
    `}

    ${mediaqueries.phablet`
        max-width: 200px;
    `}
`

export const AuthorNameOpen = styled.strong<IWithTheme>`
    position: relative;
    cursor: pointer;
    color: ${p => p.theme.colors.secondary};
    font-weight: 600;
`

export const IconContainer = styled.div`
    position: relative;
    cursor: pointer;
    margin-left: 10px;

    ${mediaqueries.phablet`
        position: absolute;
        right: 0;
        bottom: 0;
        top: 10px;
        height: 100%;
    `}
`

export const IconOpenContainer = styled.div`
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 21px;
`

export const CoAuthorsContainer = styled.div<{ isOpen: boolean } & IWithTheme>`
    position: relative;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: ${p => p.theme.colors.grey};
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        left: -20px;
        right: -20px;
        top: -16px;
        bottom: -16px;
        background: ${p => p.theme.colors.card};
        box-shadow: ${p =>
            p.isOpen ? 'none' : ' 0px 0px 15px rgba(0, 0, 0, 0.1)'};
        border-radius: 5px;
        z-index: 0;
        transition: opacity 0.3s;
        cursor: pointer;
        opacity: 0;
    }

    &:hover::before {
        opacity: 1;
    }

    ${mediaqueries.phablet`
        font-size: 14px;
        align-items: center;

        &::before {
        box-shadow: none;
        bottom: -30px;
        background: transparent;
        }


        strong {
        display: block;
        font-weight: semi-bold;
        margin-bottom: 5px;
        }
    `}
`

export const HideOnMobile = styled.span`
    ${mediaqueries.phablet`
        display: none;
    `}
`

export const NavControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ToolTip = styled.div<{ isDark: boolean; hasCopied: boolean }>`
    position: absolute;
    padding: 4px 13px;
    background: ${p => (p.isDark ? '#000' : 'rgba(0,0,0,0.1)')};
    color: ${p => (p.isDark ? '#fff' : '#000')};
    border-radius: 5px;
    font-size: 14px;
    top: -35px;
    opacity: ${p => (p.hasCopied ? 1 : 0)};
    transform: ${p => (p.hasCopied ? 'translateY(-3px)' : 'none')};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid ${p => (p.isDark ? '#000' : 'rgba(0,0,0,0.1)')};
    }
`

export const IconWrapper = styled.button`
    opacity: 0.5;
    position: relative;
    z-index: 200000000;
    border-radius: 5px;
    width: 40px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
    margin-left: 30px;

    &:hover {
        opacity: 1;
    }

    ${mediaqueries.tablet`
        display: inline-flex;
        transform: scale(0.9);
        margin: 0 15px;


        &:hover {
            opacity: 0.5;
        }
    `}
`

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
export const MoonOrSun = styled.div<IWithTheme>`
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: ${p => (p.isDark ? '4px' : '2px')} solid
        ${p => p.theme.colors.primary};
    background: ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 0.55 : 1)});
    transition: all 0.45s ease;
    overflow: ${p => (p.isDark ? 'visible' : 'hidden')};

    &::before {
        content: '';
        position: absolute;
        right: -9px;
        top: -9px;
        height: 24px;
        width: 24px;
        border: 2px solid ${p => p.theme.colors.primary};
        border-radius: 50%;
        transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
        opacity: ${p => (p.isDark ? 0 : 1)};
        transition: transform 0.45s ease;
    }

    &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: -4px 0 0 -4px;
        position: absolute;
        top: 50%;
        left: 50%;
        box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
            0 23px 0 ${p => p.theme.colors.primary},
            23px 0 0 ${p => p.theme.colors.primary},
            -23px 0 0 ${p => p.theme.colors.primary},
            15px 15px 0 ${p => p.theme.colors.primary},
            -15px 15px 0 ${p => p.theme.colors.primary},
            15px -15px 0 ${p => p.theme.colors.primary},
            -15px -15px 0 ${p => p.theme.colors.primary};
        transform: scale(${p => (p.isDark ? 1 : 0)});
        transition: all 0.35s ease;

        ${p => mediaqueries.tablet`
            transform: scale(${p.isDark ? 0.92 : 0});
        `}
    }
`

export const MoonMask = styled.div<IWithTheme>`
    position: absolute;
    right: -1px;
    top: -8px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 0;
    background: ${p => p.theme.colors.background};
    transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease, ${p => p.theme.colorModeTransition};
`

export const popUpwards = keyframes`
    0% {
        transform:matrix(.97,0,0,1,0,12);
        opacity:0
    }
    20% {
        transform:matrix(.99,0,0,1,0,2);
        opacity:.7
    }
    40% {
        transform:matrix(1,0,0,1,0,-1);
        opacity:1
    }
    70% {
        transform:matrix(1,0,0,1,0,0);
        opacity:1
    }
    100% {
        transform:matrix(1,0,0,1,0,0);
        opacity:1
    }
`

export const MenuFloat = styled.div<IWithTheme>`
    position: absolute;
    align-items: center;
    z-index: 1;
    width: ${MENU_WIDTH}px;
    height: ${MENU_HEIGHT}px;
    padding: 7px 11px 7px 19px;
    color: ${p => p.theme.colors.grey};
    background: ${p => (p.isDark ? '#fafafa' : '#000')};
    border-radius: 5px;
    font-size: 18px;
    font-weight: 600;
    transition: left 75ms ease-out, right 75ms ease-out, background 200ms;
    animation: ${popUpwards} 200ms forwards;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -8px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid ${p => (p.isDark ? '#fafafa' : '#000')};
        transition: border-color 200ms;
    }

    svg {
        path {
            fill: ${p => (p.isDark ? '#000' : '#fff')};
        }
    }
`

export const MenuText = styled.span`
    margin-right: 11px;
`

export const Hidden = styled.div`
    width: 0px;
    height: 0px;
    visibility: hidden;
    opacity: 0;
`

export const MenuShare = styled.a<{ disabled: boolean }>`
    display: flex;
    align-items: center;
    padding: 16px 11px;
    cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};

    svg {
        path {
            fill: ${p => (p.disabled ? '#F89797' : '')};
        }
    }
`

export const MenuButton = styled.button`
    display: inline-block;
    padding: 16px 11px;
`

export const MenuDivider = styled.div`
    display: inline-block;
    height: 17px;
    width: 1px;
    position: relative;
    margin: 0 8px;
    background: rgba(115, 115, 125, 0.3);
`
