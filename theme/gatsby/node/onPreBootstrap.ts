import { IPluginApi, IConfig } from '~types'
import { Node } from 'gatsby'

export const onPreBootstrap = (
    { reporter }: IPluginApi<Node>,
    themeOptions: IConfig,
) => {
    // noop
}
