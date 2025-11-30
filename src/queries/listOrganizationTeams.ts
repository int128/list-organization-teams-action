import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type { ListOrganizationTeamsQuery, ListOrganizationTeamsQueryVariables } from '../generated/graphql.js'

const query = /* GraphQL */ `
  query listOrganizationTeams($organization: String!, $userLogins: [String!]!) {
    rateLimit {
      cost
      remaining
    }
    organization(login: $organization) {
      teams(first: 100, userLogins: $userLogins) {
        totalCount
        nodes {
          name
        }
      }
    }
  }
`

export const listOrganizationTeams = async (
  octokit: Octokit,
  v: ListOrganizationTeamsQueryVariables,
): Promise<ListOrganizationTeamsQuery> =>
  core.group(`listOrganizationTeams(${JSON.stringify(v)})`, async () => {
    const r = await octokit.graphql<ListOrganizationTeamsQuery>(query, v)
    core.info(JSON.stringify(r, undefined, 2))
    return r
  })
