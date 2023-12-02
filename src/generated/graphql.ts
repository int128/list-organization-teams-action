import * as Types from './graphql-types';

export type ListOrganizationTeamsQueryVariables = Types.Exact<{
  organization: Types.Scalars['String']['input'];
  userLogins: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type ListOrganizationTeamsQuery = { __typename?: 'Query', rateLimit?: { __typename?: 'RateLimit', cost: number, remaining: number } | null, organization?: { __typename?: 'Organization', teams: { __typename?: 'TeamConnection', totalCount: number, nodes?: Array<{ __typename?: 'Team', name: string } | null> | null } } | null };
