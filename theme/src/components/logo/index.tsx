import React from 'react'
import { LogoContainer } from './styles'
import { SvgDesktop, SvgPhablet } from './svg'

interface Props {
    fill?: string
}

export const Logo = ({ fill = '#fff' }: Props) => {
    return <SvgPhablet fill={fill} />
}
