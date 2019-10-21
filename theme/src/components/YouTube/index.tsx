import React from 'react'
import mediaqueries from '@styles/media'
import styled from '@emotion/styled'
import { IWithTheme } from '@types'

const YouTube = ({ id: string }) => (
    <Wrapper>
        <iframe
            width={680}
            height={(680 * 9) / 16}
            src={`https://www.youtube-nocookie.com/embed/${string}`}
            frameBorder='0'
            allow='picture-in-picture'
            allowFullScreen
        ></iframe>
    </Wrapper>
)

export default YouTube

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
