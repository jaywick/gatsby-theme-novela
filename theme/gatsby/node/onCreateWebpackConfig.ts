import path from 'path'
import { IPluginApi } from '~types'
import { Node } from 'gatsby'

export const onCreateWebpackConfig = ({
    actions: { setWebpackConfig },
}: IPluginApi<Node>) => {
    setWebpackConfig({
        resolve: {
            alias: {
                '~components': path.resolve(__dirname, '../../src/components/'),
                '~icons': path.resolve(__dirname, '../../src/icons/'),
                '~styles': path.resolve(__dirname, '../../src/styles/'),
                '~utils': path.resolve(__dirname, '../../src/utils/'),
                '~types': path.resolve(__dirname, '../../src/types/'),
            },
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
    })
}
