declare module 'string.prototype.matchall' {
    /**
     * Matches a string with a regular expression, and returns an iterable of matches
     * containing the results of that search.
     * @param target String literal to match against.
     * @param regexp A variable name or string literal containing the regular expression pattern and flags.
     */
    function matchAll(
        target: string,
        regexp: RegExp,
    ): IterableIterator<RegExpMatchArray>

    export default matchAll
}
