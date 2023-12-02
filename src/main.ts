import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  const outputs = await run({
    organization: core.getInput('organization', { required: true }),
    usernames: core.getMultilineInput('usernames', { required: true }),
    includes: core.getMultilineInput('includes'),
    limit: Number(core.getInput('limit', { required: true })),
    token: core.getInput('token', { required: true }),
  })
  core.info(`Outputs = ${JSON.stringify(outputs, undefined, 2)}`)
  core.setOutput('teams', outputs.teams.join('\n'))
}

main().catch((e: Error) => {
  core.setFailed(e)
  console.error(e)
})
