import { describe, expect, it, vi } from 'vitest'
import { listOrganizationTeams } from '../src/queries/listOrganizationTeams.js'
import { run } from '../src/run.js'

vi.mock('../src/queries/listOrganizationTeams')

describe('run', () => {
  it('should return the teams', async () => {
    vi.mocked(listOrganizationTeams).mockResolvedValueOnce({
      organization: {
        teams: {
          totalCount: 1,
          nodes: [{ name: 'sre' }, { name: 'staff' }, { name: 'devs' }],
        },
      },
    })

    const outputs = await run({
      organization: 'my-org',
      usernames: ['octocat'],
      includes: [],
      limit: 1,
      addPrefix: '',
      token: 'GITHUB_TOKEN',
    })
    expect(outputs).toStrictEqual({
      teams: ['sre'],
    })
    expect(listOrganizationTeams).toHaveBeenCalled()
  })
})
