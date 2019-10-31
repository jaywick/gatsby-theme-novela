import React from 'react'
import { ImageCreditWrapper } from './styles'
import { Anchor } from '@components/anchor'

interface Props {
    name: string
    link: string
    extraText?: string
}

export const ImageCredit = ({ name, link, extraText }: Props) => (
    <ImageCreditWrapper>
        Hero image credit to <Anchor href={link}>{name}</Anchor>. {extraText}
    </ImageCreditWrapper>
)
