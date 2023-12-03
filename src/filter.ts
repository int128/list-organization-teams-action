type Options = {
  includes: string[]
  limit: number
  addPrefix: string
}

export const filter = (names: string[], options: Options): string[] => {
  let result = names

  if (options.includes.length > 0) {
    const includes = new Set(options.includes)
    result = result.filter((name) => includes.has(name))
  }

  if (options.limit > 0) {
    result = result.slice(0, options.limit)
  }

  if (options.addPrefix) {
    result = result.map((name) => `${options.addPrefix}${name}`)
  }

  return result
}
