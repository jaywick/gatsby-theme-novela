import styled from '@emotion/styled'
import { mediaqueries } from '~styles/media'
import { IWithTheme } from '~types'
import { h3 } from '~components/headings'

export const SubscriptionContainer = styled.div<{ theme?: any }>`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 64px 0 55px;
    margin: 10px auto 100px;
    background: ${p => p.theme.colors.card};
    box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.05);
    z-index: 1;

    ${mediaqueries.tablet`
        text-align: center;
    `}

    ${mediaqueries.phablet`
        margin: -20px auto 80px;
    `}
`

export const Content = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 640px;

    ${mediaqueries.tablet`
        h3 {
            padding: 0 50px;
        }
    `}

    ${mediaqueries.phone`
        h3 {
            padding: 0 24px;
        }
    `}
`

export const Heading = styled(h3)`
    margin-bottom: 20px;

    ${mediaqueries.tablet`
        margin-bottom: 15px;
    `}
`

export const Text = styled.p<IWithTheme>`
    margin: 0 auto 30px;
    color: ${p => p.theme.colors.grey};
    line-height: 1.75;

    ${mediaqueries.tablet`
        padding: 0 26px;
        margin: 0 auto 25px;
    `}
`

export const ReadMoreLink = styled.a<IWithTheme>`
    color: ${p => p.theme.colors.primary};
    font-weight: bold;
    transition: color 0.2s linear, background-color 0.2s linear;
    padding: 5px 10px;
    margin-left: -10px;
    border-radius: 20px;

    svg * {
        fill: ${p => p.theme.colors.primary};
        transition: fill 0.2s linear;
    }

    &:hover {
        color: ${p => p.theme.colors.background};
        background-color: ${p => p.theme.colors.primary};

        svg * {
            fill: ${p => p.theme.colors.background};
        }
    }
`

export const Spacer = styled.span`
    width: 4px;
`
