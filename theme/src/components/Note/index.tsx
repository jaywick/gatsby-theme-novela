import styled from '@emotion/styled'

const Note = styled.p`
    line-height: 1.756;
    font-size: 18px;
    color: ${p => p.theme.colors.articleText};
    font-family: ${p => p.theme.fonts.sansSerif};
    transition: ${p => p.theme.colorModeTransition};
    margin: 0 auto 35px;
    background: red;
    width: 100%;
    max-width: 680px;

    padding: 16px;
    background-color: var(--theme-ui-colors-highlight, hsl(260, 20%, 40%));
    border-radius: 4px;
    border-left: 8px solid var(--theme-ui-colors-primary, hsl(260, 100%, 80%));
`

export default Note
