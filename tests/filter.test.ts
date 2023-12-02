import { filter } from '../src/filter'

describe('filter', () => {
  it.each([{ names: [] }, { names: ['foo'] }, { names: ['foo', 'bar'] }])(
    'should return $names as-is if options is not set',
    ({ names }) => {
      expect(filter(names, { includes: [], limit: 0 })).toStrictEqual(names)
    },
  )

  it.each([
    { names: [], includes: ['foo'], expected: [] },
    { names: ['foo'], includes: ['foo'], expected: ['foo'] },
    { names: ['foo'], includes: ['bar'], expected: [] },
    { names: ['foo', 'bar'], includes: ['foo'], expected: ['foo'] },
    { names: ['foo', 'bar'], includes: ['foo', 'bar'], expected: ['foo', 'bar'] },
  ])('should filter names by $includes', ({ names, includes, expected }) => {
    expect(filter(names, { includes, limit: 0 })).toStrictEqual(expected)
  })

  it.each([
    { names: [], limit: 0, expected: [] },
    { names: ['foo'], limit: 0, expected: ['foo'] },
    { names: ['foo'], limit: 1, expected: ['foo'] },
    { names: ['foo'], limit: 2, expected: ['foo'] },
    { names: ['foo', 'bar'], limit: 0, expected: ['foo', 'bar'] },
    { names: ['foo', 'bar'], limit: 1, expected: ['foo'] },
    { names: ['foo', 'bar'], limit: 2, expected: ['foo', 'bar'] },
    { names: ['foo', 'bar'], limit: 3, expected: ['foo', 'bar'] },
  ])('should return elements up-to $limit', ({ names, limit, expected }) => {
    expect(filter(names, { includes: [], limit })).toStrictEqual(expected)
  })
})
