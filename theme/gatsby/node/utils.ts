export const buildPaginatedPath = (index: number, basePath: string) => {
    if (basePath === '/') {
        return index > 1 ? `${basePath}page/${index}` : basePath
    }
    return index > 1 ? `${basePath}/page/${index}` : basePath
}

export const slugifyWithBase = (string: string, base: string) => {
    const permaLink = string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    return `${base}/${permaLink}`.replace(/\/\/+/g, '/')
}

export const byDateSorter = (a, b) =>
    Number(new Date(b.dateForSEO)) - Number(new Date(a.dateForSEO))

export const log = (message: string, section: string) =>
    console.log(
        `\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`,
    )

export const slugify = (input: string) => {
    return input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

export const generateSlug = (...args: string[]) => {
    return `/${args.join('/')}`.replace(/\/\/+/g, '/')
}

export const tuple = <T extends any[]>(...args: T): T => args
