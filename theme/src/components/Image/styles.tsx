import styled from '@emotion/styled'
import GatsbyImg from 'gatsby-image'
import { mediaqueries } from '@styles/media'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #ccc;
    color: #898989;
    font-size: 32px;
    font-weight: 600;

    ${mediaqueries.phablet`
        font-size: 28px;
    `}
`

/**
 * To soften the blur-up we get from the default configuration of gatbsy image
 * we're adding a CSS blur to the image. This makes it smoother!
 */
export const StyledGatsbyImag = styled(GatsbyImg)`
    & > img {
        filter: blur(8px);
    }
`
