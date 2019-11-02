import React from 'react'
import { ITag } from '~types'
import { Hero, Subheading } from './styles'
import { Heading } from '~components/tags/styles'

interface TagHeroProps {
    tag: ITag
}

export const TagHero = (props: TagHeroProps) => {
    return (
        <Hero>
            <Heading>{props.tag.name}</Heading>
            <Subheading>{props.tag.story}</Subheading>
        </Hero>
    )
}
