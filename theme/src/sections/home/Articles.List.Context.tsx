import React, { createContext, useState } from 'react'

interface ViewTabProviderProps {
    children: React.ReactChild
}

type ViewTab = 'articles' | 'projects'

interface IViewTabContext {
    viewTab: ViewTab
    hasSetViewTab: boolean
    setViewTab: (viewTab: ViewTab) => any
    getViewTab: () => any
}

export const ViewTabContext = createContext<IViewTabContext>({
    viewTab: 'articles',
    hasSetViewTab: false,
    setViewTab: () => {},
    getViewTab: () => {},
})

function ViewTabProvider({ children }: ViewTabProviderProps) {
    const initialTab: ViewTab = 'articles'

    const [viewTab, setViewTab] = useState<ViewTab>(initialTab)
    const [hasSetViewTab, setHasSetViewTab] = useState<boolean>(false)

    function setViewTabAndSave(viewTab: ViewTab) {
        localStorage.setItem('viewTab', viewTab || initialTab)
        setViewTab(viewTab)
    }

    function getViewTabAndSave() {
        setViewTab((localStorage.getItem('viewTab') as ViewTab) || initialTab)
        setHasSetViewTab(true)
    }

    return (
        <ViewTabContext.Provider
            value={{
                viewTab,
                hasSetViewTab,
                setViewTab: setViewTabAndSave,
                getViewTab: getViewTabAndSave,
            }}
        >
            {children}
        </ViewTabContext.Provider>
    )
}

export default ViewTabProvider
