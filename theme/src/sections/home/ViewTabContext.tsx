import React, { createContext, useState } from 'react'

type ViewTab = 'articles' | 'projects'

interface Props {
    children: React.ReactChild
}

interface IViewTabContext {
    viewTab: ViewTab
    setViewTab: (viewTab: ViewTab) => any
}

export const ViewTabContext = createContext<IViewTabContext>({
    viewTab: 'articles',
    setViewTab: () => {},
})

export const ViewTabProvider = ({ children }: Props) => {
    const initialTab: ViewTab = 'articles'
    const [viewTab, setViewTab] = useState<ViewTab>(initialTab)

    return (
        <ViewTabContext.Provider
            value={{
                viewTab,
                setViewTab,
            }}
        >
            {children}
        </ViewTabContext.Provider>
    )
}
