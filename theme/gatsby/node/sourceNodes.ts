import { IPluginApi } from '@types'
import { Node } from 'gatsby'

export const sourceNodes = ({ actions: { createTypes } }: IPluginApi<Node>) => {
    createTypes(`
        type Article implements Node {
            id: ID!
            permaLink: String!
            link: String!
            slug: String!
            title: String!
            tag: String
            date: Date! @dateformat
            author: String!
            excerpt(pruneLength: Int = 140): String!
            body: String!
            hero: File @fileByRelativePath
            timeToRead: Int
        }
    `)
}
