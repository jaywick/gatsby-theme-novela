import React from 'react'
import { Wrapper } from './styles'

export const YouTube = (props: { id: string }) => (
    <Wrapper>
        <iframe
            width={680}
            height={(680 * 9) / 16}
            src={`https://www.youtube-nocookie.com/embed/${props.id}`}
            frameBorder='0'
            allow='picture-in-picture'
            allowFullScreen
        ></iframe>
    </Wrapper>
)
