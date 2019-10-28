import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useColorMode } from 'theme-ui'
import { Link } from 'gatsby'
import { Image } from '@components/image'
import { Icons } from '@icons'
import { IAuthor } from '@types'
import {
    AuthorLink,
    AuthorAvatar,
    HideOnMobile,
    CoAuthorsContainer,
    CoAuthorsList,
    CoAuthorAvatar,
    NameContainer,
    IconContainer,
    CoAuthorsListOpen,
    IconOpenContainer,
    CoAuthorsListItemOpen,
    CoAuthorAvatarOpen,
    AuthorNameOpen,
} from './styles'

interface Props {
    authors: IAuthor[]
}

/**
 * Novela supports multiple authors and therefore we need to ensure
 * we render the right UI when there are varying amount of authors.
 */
export const ArticleAuthors = ({ authors }: Props) => {
    const hasCoAuthors = authors.length > 1

    // Special dropdown UI for multiple authors
    if (hasCoAuthors) {
        return <CoAuthors authors={authors} />
    } else {
        return (
            <AuthorLink
                as={authors[0].authorsPage ? Link : 'div'}
                to={authors[0].link}
            >
                <AuthorAvatar>
                    <Image src={authors[0].avatar.small} />
                </AuthorAvatar>
                <strong>{authors[0].name}</strong>
                <HideOnMobile>,&nbsp;</HideOnMobile>
            </AuthorLink>
        )
    }
}

const CoAuthors = ({ authors }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [colorMode] = useColorMode()
    const names = generateAuthorNames(authors)

    const fill = colorMode === 'dark' ? '#fff' : '#000'
    const listWidth = { width: `${10 + authors.length * 15}px` }

    return (
        <CoAuthorsContainer onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
            <CoAuthorsList style={listWidth}>
                {authors.map((author, index) => (
                    <CoAuthorAvatar
                        style={{ left: `${index * 15}px` }}
                        key={author.name}
                    >
                        <Image src={author.avatar.small} />
                    </CoAuthorAvatar>
                ))}
            </CoAuthorsList>
            <NameContainer>{names}</NameContainer>
            <IconContainer>
                <Icons.ToggleOpen fill={fill} />
            </IconContainer>

            {isOpen && (
                <OutsideClickHandler onOutsideClick={() => setIsOpen(!isOpen)}>
                    <CoAuthorsListOpen>
                        <IconOpenContainer>
                            <Icons.ToggleClose fill={fill} />
                        </IconOpenContainer>
                        {authors.map(author => (
                            <CoAuthorsListItemOpen key={author.name}>
                                <AuthorLink
                                    as={author.authorsPage ? Link : 'div'}
                                    to={author.link}
                                >
                                    <CoAuthorAvatarOpen>
                                        <Image src={author.avatar.small} />
                                    </CoAuthorAvatarOpen>
                                    <AuthorNameOpen>
                                        {author.name}
                                    </AuthorNameOpen>
                                </AuthorLink>
                            </CoAuthorsListItemOpen>
                        ))}
                    </CoAuthorsListOpen>
                </OutsideClickHandler>
            )}
        </CoAuthorsContainer>
    )
}

/**
 * When generating the author names we're also checking to see how long the
 * number of authors are. If it's only 2 authors we'll show the fullnames.
 * Otherwise it'll only preview the first names of each author.
 */
const generateAuthorNames = (authors: IAuthor[]) => {
    return authors
        .map(author => {
            if (authors.length > 2) {
                return author.name.split(' ')[0]
            } else {
                return author.name
            }
        })
        .join(', ')
}
