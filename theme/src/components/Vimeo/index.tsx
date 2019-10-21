import React from 'react'
import mediaqueries from '@styles/media'
import styled from '@emotion/styled'
import { IWithTheme } from '@types'

const Vimeo = (props: { id: string }) => (
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

export default Vimeo

const Wrapper = styled.p<IWithTheme>`
    line-height: 1.756;
    font-size: 18px;
    margin: 0 auto 35px;
    width: 680px;

    ${mediaqueries.desktop`
        max-width: 507px;
    `}

    ${mediaqueries.tablet`
        max-width: 486px;
        margin: 0 auto 25px;
    `};

    ${mediaqueries.phablet`
        padding: 0 20px;
    `};
`
