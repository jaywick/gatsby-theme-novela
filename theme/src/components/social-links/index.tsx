import React from 'react'
import { Icons } from '@icons'
import { SocialIconContainer, Hidden } from './styles'

interface SocialLinksProps {
    links: {
        name: string
        url: string
    }[]
    fill: string
}

const icons = {
    dribbble: Icons.Dribbble,
    linkedin: Icons.LinkedIn,
    twitter: Icons.Twitter,
    instagram: Icons.Instagram,
    github: Icons.Github,
    youtube: Icons.YouTube,
    dev: Icons.DevTo,
}

const getHostname = (url: string) => {
    return new URL(url.toLowerCase()).hostname.replace('www.', '').split('.')[0]
}

export const SocialLinks = ({
    links,
    fill = '#73737D',
}: Partial<SocialLinksProps>) => {
    if (!links) return null

    return (
        <>
            {links.map(option => {
                const name = getHostname(option.url)
                const Icon = icons[name]
                if (!Icon) {
                    throw new Error(
                        `unsupported social link name=${name} / url=${option.url}`,
                    )
                }
                return (
                    <SocialIconContainer
                        key={option.url}
                        target='_blank'
                        rel='noopener'
                        data-a11y='false'
                        aria-label={`Link to ${option.url}`}
                        href={option.url}
                    >
                        <Icon fill={fill} />
                        <Hidden>Link to ${option.url}</Hidden>
                    </SocialIconContainer>
                )
            })}
        </>
    )
}
