import matchAll from 'string.prototype.matchall'
import { pathExistsSync, readdirSync } from 'fs-extra'
import { join } from 'path'
import { IPluginApi, IMdxNode, IFileNode } from '@types'
import { difference } from 'lodash'

export const validate = ({
    getNode,
    node: mdxNode,
    reporter,
}: IPluginApi<IMdxNode>) => {
    const fileNode = getNode(mdxNode.parent) as IFileNode

    const imageTags = Array.from(
        // regex captures images with format ![alt text](path/to/image "title text")
        matchAll(mdxNode.rawBody, /!\[(.*?)\]\((.+?)( \".+?\")?\)/g),
    )

    const localImages = imageTags
        .map(match => {
            return {
                alt: match[1],
                filename: match[2],
            }
        })
        .filter(({ filename }) => filename.startsWith('./'))

    localImages.forEach(({ alt, filename }) => {
        const imagePath = join(fileNode.absolutePath, '..', filename)

        if (!pathExistsSync(imagePath)) {
            reporter.error(
                `Missing referenced image in ${fileNode.absolutePath} called '${filename}'`,
            )
        }

        if (isBlank(alt)) {
            reporter.info(
                `Missing alt text for image ${filename} in ${fileNode.relativePath}`,
            )
        }
    })

    const folderPath = join(fileNode.absolutePath, '..')
    const attachments = readdirSync(folderPath).filter(
        filepath => !filepath.endsWith('.mdx') && !filepath.endsWith('.md'),
    )

    const orphans = difference(
        attachments.map(x => `./${x}`),
        localImages.map(x => x.filename),
    )
    orphans.forEach(filename => {
        reporter.info(
            `Orphaned attachment in ${fileNode.relativeDirectory}/: "${filename}"`,
        )
    })
}

function isBlank(text: string | null | undefined) {
    if (!text) {
        return true
    }

    return !text.trim()
}
