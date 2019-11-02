import React, { useEffect, useState } from 'react'
import { throttle } from 'lodash'
import { clamp } from '~utils'
import { ProgressContainer, Trackline, ProgressLine } from './styles'

export interface Props {
    contentHeight: number
}

export const Progress = ({ contentHeight }: Props) => {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const handleScroll = throttle(() => {
            const percentComplete = (window.scrollY / contentHeight) * 100

            setProgress(clamp(+percentComplete.toFixed(2), -2, 104))
        }, 20)

        if (contentHeight) {
            window.addEventListener('scroll', handleScroll)
            window.addEventListener('resize', handleScroll)
            return () => {
                window.removeEventListener('scroll', handleScroll)
                window.removeEventListener('resize', handleScroll)
            }
        }
    }, [contentHeight])

    return (
        <ProgressContainer tabIndex={-1}>
            <Trackline aria-hidden='true'>
                <ProgressLine
                    style={{ transform: `translateY(${progress}%)` }}
                />
            </Trackline>
        </ProgressContainer>
    )
}
