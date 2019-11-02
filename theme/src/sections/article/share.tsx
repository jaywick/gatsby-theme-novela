import React, { useState, useEffect } from 'react'
import { useColorMode } from 'theme-ui'

import { Icons } from '~icons'

import {
    getHighlightedTextPositioning,
    getSelectionDimensions,
    getSelectionText,
    getWindowDimensions,
    getBreakpointFromTheme,
} from '~utils'
import {
    MenuFloat,
    MenuText,
    MenuButton,
    MenuShare,
    Hidden,
    MENU_WIDTH,
    MENU_HEIGHT,
} from './styles'

interface MenuFloatState {
    x: number
    y: number
    show: boolean
}

export const ArticleShare = () => {
    const [colorMode] = useColorMode()
    const [text, setText] = useState('')
    const [focus, setFocus] = useState(false)
    const [canTweet, setCanTweet] = useState(true)
    const [{ x, y, show }, setPosition] = useState<MenuFloatState>({
        x: 0,
        y: 0,
        show: false,
    })

    const share = generateShare(text)
    const isDark = colorMode === 'dark'

    useEffect(() => {
        const events: string[] = ['keydown', 'keyup', 'mouseup', 'resize']

        const handleMenuFloatSettings = () => {
            /**
             * Why is there a setTimeout here?
             * There is an issue with clicking on highlited text and the browsers ability
             * to calcualte the correct ranges. If you highlight text, then click on it,
             * the window.selection values will give the previous ranges instead of the current!
             */
            setTimeout(() => {
                const article = document.getElementsByTagName('article')[0]
                const paragraphOffset = document.getElementsByTagName('p')[0]
                    .offsetLeft

                if (!article) return

                // We want to not show the menu float in code blocks
                const codeBlocks = Array.from(
                    article.getElementsByClassName('.prism-code'),
                )
                const isHighlightedInCodeBlock = codeBlocks.some(block =>
                    window.getSelection().containsNode(block, true),
                )

                if (isHighlightedInCodeBlock) return

                const articleBox = article.getBoundingClientRect() as DOMRect

                const { width, height } = getSelectionDimensions()
                const { x, y } = getHighlightedTextPositioning()
                const { width: windowWidth } = getWindowDimensions()
                const tablet = getBreakpointFromTheme('tablet')
                const desktop = getBreakpointFromTheme('desktop')

                /**
                 * Because the article is offset to the side to compensate for the progress bar
                 * we need to calculate the offset of the menu share in the same way.
                 */
                let paddingOffset = 0

                if (windowWidth > tablet) {
                    paddingOffset = 53
                }

                if (windowWidth > desktop) {
                    paddingOffset = 68
                }

                /**
                 * Get the X and Y offsets of the editors Left and Top positions
                 * If the height is great than 20 (the user has highlighted more than 2 rows of text)
                 * then start the position from the left most edge so we can center the bar in
                 * the middle of the text area
                 */
                const offset: { x: number; y: number } = {
                    x: height > 29 ? paragraphOffset + paddingOffset : x,
                    y: y - articleBox.y - 160,
                }

                setPosition({
                    x: offset.x + width / 2 - MENU_WIDTH / 2 - paddingOffset,
                    y: offset.y - MENU_HEIGHT - 5,
                    show: width > 1,
                })

                setText(getSelectionText())
            }, 0)
        }

        // attach all events
        events.forEach(event =>
            window.addEventListener(event, handleMenuFloatSettings),
        )

        return () => {
            // remove all events after mount
            events.forEach(event =>
                window.removeEventListener(event, handleMenuFloatSettings),
            )
        }
    }, [show])

    /**
     * Small workaround to set the focus once the x and y positiosn are set.
     * If this is not here the user would see a quick flash of the floating bar
     * in its old position and then animating to the new location. We don't want that.
     */
    useEffect(() => {
        setTimeout(() => {
            const { width } = getSelectionDimensions()
            setFocus(width > 1)
        }, 0)
    }, [show])

    const handleCopyClick = () => {
        const tempInput = document.createElement('input')
        document.body.appendChild(tempInput)
        tempInput.setAttribute('value', text)
        tempInput.select()
        document.execCommand('copy')
        document.body.removeChild(tempInput)
    }

    /**
     * Setting the ability to tweet. If the user highlights more than the allowed
     * characters we need to give them feedback that it's too long to tweet.
     */
    useEffect(() => {
        const tweetLimit = 280
        const otherCharactersInTweet = '""—  ' // 2 quotes, 1 emdash, 2 spaces
        const url = window.location.href
        const tweet = text + url + otherCharactersInTweet

        setCanTweet(tweet.length <= tweetLimit)
    }, [text])

    return (
        <MenuFloat
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                display: show && focus ? 'flex' : 'none',
                pointerEvents: show && focus ? 'initial' : 'none',
            }}
            isDark={isDark}
        >
            <MenuText>Share: </MenuText>
            <MenuButton
                onClick={handleCopyClick}
                title='Copy selected text'
                aria-label='Copy selected text'
            >
                <Icons.Copy />
            </MenuButton>
            <ReferralLink
                disabled={false}
                share={share.devto}
                title='Share on dev.to'
                aria-label='Share on dev.to'
            >
                <Icons.DevTo width='18px' height='18px' />
            </ReferralLink>
            <ReferralLink
                disabled={!canTweet}
                share={share.twitter}
                title='Share on Twitter'
                aria-label='Share on Twitter'
            >
                <Icons.Twitter width='18px' height='18px' />
            </ReferralLink>
        </MenuFloat>
    )
}

function ReferralLink({ disabled, share, title, children }) {
    function handleClick(event) {
        event.preventDefault()
        if (disabled) return

        window.open(
            share,
            '',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600',
        )
    }

    return (
        <MenuShare
            href={disabled ? '' : share}
            onClick={handleClick}
            disabled={disabled}
            title={title}
        >
            <Hidden>Share the selected text</Hidden>
            {children}
        </MenuShare>
    )
}

const truncate = (text: string) => {
    if (text.length <= 100) {
        return text
    }

    return text.slice(0, 100).toString() + '…'
}

const generateShare = (shareText: string) => {
    if (!shareText) return {}
    const url = window.location.href

    return {
        twitter: `https://twitter.com/intent/tweet?text="${shareText}" — ${url}`,
        devto:
            `https://dev.to/new?prefill=` +
            [
                `---`,
                `title: ${truncate(shareText)}`,
                `---`,
                '',
                `> ${shareText.split('\n').join('\n> ')}`,
                '',
                ` — ${url}`,
            ]
                .map(encodeURI)
                .join(encodeURI('\n')),
    }
}
