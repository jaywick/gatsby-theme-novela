import React from 'react'
import styled from '@emotion/styled'

import { Image } from '~components/image'

import { mediaqueries } from '~styles/media'
import { IAuthor, IWithTheme } from '~types'

import { SocialLinks } from '~components/social-links'
import { Hero, HeroImage, Subheading, Social } from './styles'
import { Heading } from '~components/tags/styles'

interface AuthorHeroProps {
    author: IAuthor
}

export const AuthorHero = ({ author }: AuthorHeroProps) => {
    return (
        <Hero>
            <HeroImage>
                <Image src={author.avatar.large} />
            </HeroImage>
            <Heading>{author.name}</Heading>
            <Subheading>{author.bio}</Subheading>
            <Social>
                <SocialLinks links={author.social} />
            </Social>
        </Hero>
    )
}
