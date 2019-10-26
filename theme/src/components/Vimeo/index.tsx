import React from 'react'
import { Wrapper } from './styles'

export const Vimeo = (props: { id: string }) => (
    <Wrapper>
        <iframe
            src={`https://player.vimeo.com/video/${props.id}`}
            width='680'
            height={(680 * 9) / 16}
            frameBorder='0'
            allowFullScreen
        ></iframe>
    </Wrapper>
)
