import gql from "graphql-tag";

export const GET_PLANTS_INFO = gql`
query PlantsInfo {
  plants_info {
    id
    name
    details
  }
}
`