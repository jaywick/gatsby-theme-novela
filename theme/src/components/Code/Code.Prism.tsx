import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import nightOwlTheme from 'prism-react-renderer/themes/nightOwl'

export default ({ codeString, language }) => {
    return (
        <Highlight
            {...defaultProps}
            code={codeString}
            language={language}
            theme={nightOwlTheme}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{ ...style, padding: '20px' }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}
