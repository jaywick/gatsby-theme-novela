import { CreateResolversArgs, Node } from 'gatsby'

/**
 * Helper that grabs the mdx resolver when given a string fieldname
 */
const mdxResolverPassthrough = (fieldName: string) => async (
    source: Node,
    arguments_,
    context,
    info,
) => {
    const mdxNode = context.nodeModel.getNodeById({ id: source.parent })
    const fields = info.schema.getType('Mdx').getFields()
    const resolver = fields[fieldName].resolve
    const data = { fieldName }

    return await resolver(mdxNode, arguments_, context, data)
}

/**
 * Define resolvers for custom fields
 */
export const createResolvers = ({
    createResolvers: createResolversAction,
}: CreateResolversArgs) => {
    createResolversAction({
        Article: {
            excerpt: {
                resolve: mdxResolverPassthrough('excerpt'),
            },
            body: {
                resolve: mdxResolverPassthrough('body'),
            },
            timeToRead: {
                resolve: mdxResolverPassthrough('timeToRead'),
            },
        },
    })
}
