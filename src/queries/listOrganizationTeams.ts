import { GitHub } from '@actions/github/lib/utils'
import { ListOrganizationTeamsQuery, ListOrganizationTeamsQueryVariables } from '../generated/graphql'

type Octokit = InstanceType<typeof GitHub>

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
): Promise<ListOrganizationTeamsQuery> => await octokit.graphql(query, v)
