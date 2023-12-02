# list-teams-action [![ts](https://github.com/int128/list-teams-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/list-teams-action/actions/workflows/ts.yaml)

This action returns a list of teams which a user belongs to in the organization.

## Getting Started

Here is an example to add a team label.

```yaml
name: team-labeler

jobs:
  team-labeler:
    runs-on: ubuntu-latest
    steps:
      - id: list-teams
        uses: int128/list-teams-action@v1
        with:
          organization: my-org
          usernames: ${{ github.actor }}
          includes: |
            sre
      - uses: int128/issues-action@v2
        with:
          context: true
          add-labels: |
            ${{ steps.list-teams.outputs.teams }}
```

### Inputs

| Name           | Default        | Description                       |
| -------------- | -------------- | --------------------------------- |
| `organization` | (required)     | GitHub organization               |
| `usernames`    | (required)     | GitHub usernames (multiline)      |
| `includes`     | -              | If set, filter team names         |
| `limit`        | 0              | Limit of teams (0 means no limit) |
| `token`        | `github.token` | GitHub token                      |

### Outputs

| Name    | Description            |
| ------- | ---------------------- |
| `teams` | Team names (multiline) |
