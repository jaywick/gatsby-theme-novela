import { IPluginApi } from '@types'

export const sourceNodes = ({ actions: { createTypes } }: IPluginApi) => {
    createTypes(`
        type Article implements Node {
            id: ID!
            permaLink: String!
            link: String!
            slug: String!
            title: String!
            tags: [String]
            date: Date! @dateformat
            author: String!
            excerpt(pruneLength: Int = 140): String!
            body: String!
            hero: File @fileByRelativePath
            timeToRead: Int
        }
    `)
}
