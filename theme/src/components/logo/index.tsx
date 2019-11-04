import React from 'react'
import { LogoContainer } from './styles'
import { SvgDesktop, SvgPhablet } from './svg'

interface Props {
    fill?: string
}

export const Logo = ({ fill = '#fff' }: Props) => {
    return (
        <LogoContainer>
            <SvgDesktop fill={fill} />
            <SvgPhablet fill={fill} />
        </LogoContainer>
    )
}
