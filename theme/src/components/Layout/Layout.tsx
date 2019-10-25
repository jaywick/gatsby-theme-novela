import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'

import NavigationFooter from '@components/Navigation/Navigation.Footer'
import NavigationHeader from '@components/Navigation/Navigation.Header'
import { ViewTabProvider } from '../../sections/home/ViewTabContext'

import { globalStyles } from '@styles'
import { IWithTheme } from '@types'

interface LayoutProps {
    children: React.ReactChild | React.ReactChild[]
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
function Layout({ children }: LayoutProps) {
    const [colorMode] = useColorMode()

    useEffect(() => {
        parent.postMessage({ theme: colorMode }, '*')
    }, [colorMode])

    return (
        <ViewTabProvider>
            <Container>
                <Global styles={globalStyles} />
                <NavigationHeader />
                {children}
                <NavigationFooter />
            </Container>
        </ViewTabProvider>
    )
}

export default Layout

const Container = styled.div<IWithTheme>`
    position: relative;
    background: ${p => p.theme.colors.background};
    transition: ${p => p.theme.colorModeTransition};
    min-height: 100vh;
`
