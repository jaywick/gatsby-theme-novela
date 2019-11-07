import styled from '@emotion/styled'

export const Cite = styled.cite`
    display: block;
    text-align: right;
    font-size: 1.5rem;
    color: #73737d;

    &::before {
        content: '— ';
    }
`
