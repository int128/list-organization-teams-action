type Options = {
  includes: string[]
  limit: number
}

export const filter = (names: string[], options: Options): string[] => {
  const includes = new Set(options.includes)
  const filteredByIncludes = includes.size > 0 ? names.filter((name) => includes.has(name)) : names

  if (options.limit > 0) {
    return filteredByIncludes.slice(0, options.limit)
  }
  return filteredByIncludes
}
