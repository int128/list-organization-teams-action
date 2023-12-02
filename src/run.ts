import assert from 'assert'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { listOrganizationTeams } from './queries/listOrganizationTeams'

type Inputs = {
  organization: string
  usernames: string[]
  includes: string[]
  limit: number
  token: string
}

type Outputs = {
  teams: string[]
}

export const run = async (inputs: Inputs): Promise<Outputs> => {
  const octokit = github.getOctokit(inputs.token)

  const response = await listOrganizationTeams(octokit, {
    organization: inputs.organization,
    userLogins: inputs.usernames,
  })
  assert(response.organization)
  core.info(`Found ${response.organization.teams.totalCount} teams`)
  assert(response.organization.teams.nodes)

  const names = new Set(
    response.organization.teams.nodes.map((team) => {
      assert(team)
      return team.name
    }),
  )
  core.info(`Teams: ${[...names].join(', ')}`)

  const includes = new Set(inputs.includes)

  const teams = []
  for (const name of names) {
    if (includes.size === 0 || includes.has(name)) {
      teams.push(name)
    }
    if (inputs.limit > 0 && teams.length >= inputs.limit) {
      break
    }
  }
  return { teams }
}
