import React from 'react'
import { StyledTable } from './styles'

export const Table = ({ children }) => {
    return (
        <div style={{ overflowX: 'auto', padding: '0 20px' }}>
            <StyledTable>{children}</StyledTable>
        </div>
    )
}
