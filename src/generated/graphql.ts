/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from './graphql-types.js';

export type ListOrganizationTeamsQueryVariables = Exact<{
  organization: string;
  userLogins: Array<string> | string;
}>;


export type ListOrganizationTeamsQuery = { rateLimit: { cost: number, remaining: number } | null, organization: { teams: { totalCount: number, nodes: Array<{ name: string } | null> | null } } | null };
