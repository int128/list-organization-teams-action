import assert from 'assert'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { listOrganizationTeams } from './queries/listOrganizationTeams.js'
import { filter } from './filter.js'

type Inputs = {
  organization: string
  usernames: string[]
  includes: string[]
  limit: number
  addPrefix: string
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
  assert(response.organization.teams.nodes)

  const names = response.organization.teams.nodes.map((team) => {
    assert(team)
    return team.name
  })
  core.info(`Found ${names.length} team(s):\n${names.join('\n')}`)

  const teams = filter(names, inputs)
  return { teams }
}
