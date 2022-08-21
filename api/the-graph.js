import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.thegraph.com/subgraphs/name/pierregvx/hackparis'

const tokensQuery = (id)=>`
query{
 
    user(id:"${id}") {
      id
        trips{
        start
        end
        city
        id
      }
    }
  }
`

export function getGraph(id){const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

client
  .query({
    query: gql(tokensQuery(id)),
  })
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })}