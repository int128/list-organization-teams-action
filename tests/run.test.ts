import { Octokit } from '@octokit/action'
import { describe, expect, it, vi } from 'vitest'
import { listOrganizationTeams } from '../src/queries/listOrganizationTeams.js'
import { run } from '../src/run.js'

vi.mock('../src/queries/listOrganizationTeams')

const getOctokit = () => new Octokit({ authStrategy: null })

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

    const outputs = await run(
      {
        organization: 'my-org',
        usernames: ['octocat'],
        includes: [],
        limit: 1,
        addPrefix: '',
      },
      getOctokit(),
    )
    expect(outputs).toStrictEqual({
      teams: ['sre'],
    })
    expect(listOrganizationTeams).toHaveBeenCalled()
  })
})
