import React from 'react'
import { Link } from 'gatsby'

import { Image } from '~components/image'
import { IAuthor } from '~types'
import {
    BioContainer,
    BioAvatar,
    BioAvatarInner,
    BioTextContainer,
    BioText,
    BioSubtitle,
} from './styles'

export const Bio = ({ author }: { author: IAuthor }) => {
    return (
        <BioContainer>
            <BioAvatar
                as={author.authorsPage ? Link : 'div'}
                to={author.link}
                data-a11y='false'
                aria-label="Author's bio"
            >
                <BioAvatarInner>
                    <Image src={author.avatar.medium} />
                </BioAvatarInner>
            </BioAvatar>
            <BioTextContainer>
                <BioText dangerouslySetInnerHTML={{ __html: author.name }} />
                <BioSubtitle dangerouslySetInnerHTML={{ __html: author.bio }} />
            </BioTextContainer>
        </BioContainer>
    )
}
