import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import { useColorMode } from 'theme-ui'

import { Footer } from '@components/navigation/footer'
import { NavigationHeader } from '@components/navigation/header'
import { ViewTabProvider } from '../../sections/home/view-tab-context'

import { globalStyles } from '@styles'
import { Container } from './styles'

interface LayoutProps {
    children: React.ReactChild | React.ReactChild[]
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
export const Layout = ({ children }: LayoutProps) => {
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
                <Footer />
            </Container>
        </ViewTabProvider>
    )
}
