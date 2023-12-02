import { listOrganizationTeams } from '../src/queries/listOrganizationTeams'
import { run } from '../src/run'

jest.mock('../src/queries/listOrganizationTeams')

describe('run', () => {
  it('should show the associated pull request', async () => {
    jest.mocked(listOrganizationTeams).mockResolvedValueOnce({
      organization: {
        teams: {
          totalCount: 1,
          nodes: [
            {
              name: 'sre',
            },
          ],
        },
      },
    })

    const outputs = await run({
      organization: 'my-org',
      usernames: ['octocat'],
      includes: [],
      limit: 0,
      token: 'GITHUB_TOKEN',
    })
    expect(outputs).toStrictEqual({
      teams: ['sre'],
    })
  })
})
