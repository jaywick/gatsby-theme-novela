import React, { useRef, useEffect, useState } from 'react'
import { Container } from './styles'
import GatsbyImg from 'gatsby-image'

export const Placeholder = (props: unknown) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setDimensions(containerRef.current.getBoundingClientRect())

        const handleResize = () =>
            setDimensions(containerRef.current.getBoundingClientRect())

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Container ref={containerRef} {...props}>
            <div>
                {dimensions.width} x {dimensions.height}
            </div>
        </Container>
    )
}
