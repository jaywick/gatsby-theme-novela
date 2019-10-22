import matchAll from 'string.prototype.matchall'
import { pathExistsSync } from 'fs-extra'
import { join as joinPath } from 'path'
import { IPluginApi, IMdxNode } from '@types'
import { Reporter } from 'gatsby'

export const validate = ({
    getNode,
    node: mdxNode,
    reporter,
}: IPluginApi<IMdxNode>) => {
    const fileNode = getNode(mdxNode.parent)

    validateImagesExist({
        body: mdxNode.rawBody,
        folderPath: fileNode.relativeDirectory,
        reporter,
    })
}

function validateImagesExist(opt: {
    body: string
    folderPath: string
    reporter: Reporter
}) {
    const imageTags = Array.from(matchAll(opt.body, /!\[.*?\]\((.+?)\)/g))
    imageTags.forEach(match => {
        const imageFileName = match[1]
        const isRelative = imageFileName.startsWith('./')

        if (!isRelative) {
            return
        }

        const imagePath = joinPath(opt.folderPath, imageFileName)

        if (!pathExistsSync(imagePath)) {
            opt.reporter.warn(`Missing referenced image ${imagePath}`)
        }
    })
}
