# list-organization-teams-action [![ts](https://github.com/int128/list-organization-teams-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/list-organization-teams-action/actions/workflows/ts.yaml)

This action returns a list of teams which a user belongs to in the organization.

## Examples

### Add team labels

This example workflow adds team label(s) when a pull request is opened.

```yaml
name: team-labeler

on:
  pull_request:
    types:
      - opened

jobs:
  team-labeler:
    runs-on: ubuntu-latest
    steps:
      - id: list-teams
        uses: int128/list-organization-teams-action@v1
        with:
          token: # your PAT or GitHub App token to read your organization
          usernames: ${{ github.actor }}
      - uses: int128/issues-action@v2
        with:
          context: true
          add-labels: |
            ${{ steps.list-teams.outputs.teams }}
```

If a user belongs to a lot of teams, you can filter the teams by `includes` option.

```yaml
- id: list-teams
  uses: int128/list-organization-teams-action@v1
  with:
    token: # your PAT or GitHub App token to read your organization
    usernames: ${{ github.actor }}
    includes: |
      sre
      frontend-devs
      backend-devs
```

You can also set `limit` option to get the first matched team.

```yaml
- id: list-teams
  uses: int128/list-organization-teams-action@v1
  with:
    token: # your PAT or GitHub App token to read your organization
    usernames: ${{ github.actor }}
    limit: 1
    includes: |
      sre
      frontend-devs
      backend-devs
```

### Check if a user belongs to a team

This example checks if the current actor belongs to the specific team.

```yaml
steps:
  - id: list-teams
    uses: int128/list-organization-teams-action@v1
    with:
      token: # your PAT or GitHub App token to read your organization
      usernames: ${{ github.actor }}
      includes: sre
  - name: Check if the actor belongs to sre team
    if: steps.list-teams.outputs.teams != 'sre'
    run: exit 1
```

## Specification

### Inputs

| Name           | Default                   | Description                                |
| -------------- | ------------------------- | ------------------------------------------ |
| `organization` | `github.repository_owner` | GitHub organization                        |
| `usernames`    | (required)                | GitHub usernames (multiline)               |
| `includes`     | -                         | If set, filter team names (multiline)      |
| `limit`        | `0` (no limit)            | If set, limit the number of teams returned |
| `token`        | `github.token`            | GitHub token                               |

This action requires a GitHub token with the read permission of your organization.

### Outputs

| Name    | Description            |
| ------- | ---------------------- |
| `teams` | Team names (multiline) |
