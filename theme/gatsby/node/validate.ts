import '../../../types'
import matchAll from 'string.prototype.matchall'
import { pathExistsSync } from 'fs-extra'
import { join as joinPath } from 'path'
import { IPluginApi, IMdxNode, IFileNode } from '@types'
import { Reporter } from 'gatsby'

export const validate = ({
    getNode,
    node: mdxNode,
    reporter,
}: IPluginApi<IMdxNode>) => {
    const fileNode = getNode(mdxNode.parent) as IFileNode

    validateImages(mdxNode.rawBody, fileNode.relativePath, reporter)
}

function validateImages(body: string, filePath: string, reporter: Reporter) {
    const imageTags = Array.from(matchAll(body, /!\[.*?\]\((.+?)\)/g))

    imageTags.forEach(match => {
        const [altText, imageFileName] = match

        const isRelative = imageFileName.startsWith('./')

        if (!isRelative) {
            return
        }

        const imagePath = joinPath(filePath, '..', imageFileName)

        if (!pathExistsSync(imagePath)) {
            reporter.warn('Missing referenced image', imagePath)
        }

        if (isBlank(altText)) {
            reporter.warn('Missing alt text for image', imageFileName, filePath)
        }
    })
}

function isBlank(text: string | null | undefined) {
    if (!text) {
        return true
    }

    return !text.trim()
}
