import React from 'react'

import { Section } from '~components/section'
import { ITag } from '~types'
import { Icons } from '~icons'
import { useThemeUI } from 'theme-ui'
import {
    SubscriptionContainer,
    Content,
    Heading,
    ReadMoreLink,
    Spacer,
    Text,
} from './styles'

interface Props {
    tag: ITag
}

export const Tags = ({ tag }: Props) => {
    const { theme } = useThemeUI()

    return (
        <Section narrow>
            <SubscriptionContainer>
                <Content>
                    <Heading>{tag.name}</Heading>
                    <Text>{tag.story}</Text>
                    <ReadMoreLink href={`/tags/${tag.key}`}>
                        More in this series
                        <Spacer />
                        <Icons.LongArrowRight fill={theme.colors.primary} />
                    </ReadMoreLink>
                </Content>
            </SubscriptionContainer>
        </Section>
    )
}
