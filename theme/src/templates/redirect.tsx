import { useEffect } from 'react'
import { navigate } from 'gatsby'

interface Props {
    pageContext: {
        redirect: string
    }
    location: string
}

export const ArticleRedirect = (props: Props) => {
    useEffect(() => void navigate(props.pageContext.redirect), [])

    return null
}
