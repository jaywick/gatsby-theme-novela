import * as fs from 'fs-extra'
import { IPluginApi, IConfig } from '@types'

export const onPreBootstrap = (
    { reporter }: IPluginApi,
    themeOptions: IConfig,
) => {
    // noop
}
