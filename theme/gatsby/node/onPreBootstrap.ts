import * as fs from 'fs-extra'
import { IPluginApi, IConfig } from '@types'

export const onPreBootstrap = (
    { reporter }: IPluginApi,
    themeOptions: IConfig,
) => {
    const authorsPath = themeOptions.contentAuthors || 'content/authors'

    if (!fs.existsSync(authorsPath)) {
        reporter.warn(`
            Missing directory for Authors.
            We are creating the "${authorsPath}" directory for you.
            Please ensure you add your authors within "${authorsPath}"
        `)

        fs.mkdirSync(authorsPath, { recursive: true })
    }
}
