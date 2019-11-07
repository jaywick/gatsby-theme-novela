import React from 'react'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import { useColorMode } from 'theme-ui'

import { Anchor } from '~components/anchor'
import { Blockquote } from '~components/blockquote'
import { CodeBlock, Pre } from '~components/code'
import { h2, h3, h4, h5, h6 } from '~components/headings'
import { HorizontalRule } from '~components/horizontal-rule'
import { OrderedList } from '~components/lists'
import { UnorderedList } from '~components/lists'
import { Paragraph } from '~components/paragraph'
import { Table, Cell, HeadCell, Head } from '~components/tables'
import { Zoom } from '~components/image'
import { Note } from '~components/note'
import { YouTube } from '~components/youtube'
import { Vimeo } from '~components/vimeo'
import { ImageCredit } from '~components/image-credit'
import { Cite } from '~components/cite'
import { MDXBody } from './styles'

const components = {
    img: Zoom,
    a: Anchor,
    blockquote: Blockquote,
    h1: h2, // h1 reserved article title
    h2,
    h3,
    h4,
    h5,
    h6,
    hr: HorizontalRule,
    ul: UnorderedList,
    ol: OrderedList,
    p: Paragraph,
    code: CodeBlock,
    pre: Pre,
    table: Table,
    thead: Head,
    th: HeadCell,
    td: Cell,
    cite: Cite,
    ImageCredit,
    Note,
    Vimeo,
    YouTube,
}

export const MDX = ({ content, children, ...props }) => {
    const [colorMode] = useColorMode()

    return (
        <MDXProvider components={components}>
            <MDXBody>
                <MDXRenderer isDark={colorMode === 'dark'} {...props}>
                    {content}
                </MDXRenderer>
                {children}
            </MDXBody>
        </MDXProvider>
    )
}
