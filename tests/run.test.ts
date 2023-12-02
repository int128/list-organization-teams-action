import { listOrganizationTeams } from '../src/queries/listOrganizationTeams'
import { run } from '../src/run'

jest.mock('../src/queries/listOrganizationTeams')

describe('run', () => {
  it('should return the teams', async () => {
    jest.mocked(listOrganizationTeams).mockResolvedValueOnce({
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
      token: 'GITHUB_TOKEN',
    })
    expect(outputs).toStrictEqual({
      teams: ['sre'],
    })
    expect(listOrganizationTeams).toHaveBeenCalled()
  })
})
