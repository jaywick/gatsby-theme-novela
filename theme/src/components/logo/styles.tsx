import { mediaqueries } from '@styles/media'
import styled from '@emotion/styled'

export const LogoContainer = styled.div`
    .Logo__Mobile {
        display: none;
    }

    ${mediaqueries.tablet`
        .Logo__Desktop {
            display: none;
        }

        .Logo__Mobile{
            display: block;
        }
    `}
`
