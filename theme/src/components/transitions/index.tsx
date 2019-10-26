import React from 'react'
import { Transition } from './styles'

interface CSSFadeInProps {
    as?: string
    children: React.ReactChildren
}

const CSSFadeIn = ({ as, children }: CSSFadeInProps) => {
    return <Transition as={as}>{children}</Transition>
}

export const Transitions = {
    CSS: {
        FadeIn: CSSFadeIn,
    },
}
