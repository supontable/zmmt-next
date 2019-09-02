import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Container } from '@material-ui/core';
import ErrorMessage from '../ErrorMessage'
import WarningMessage from '../WarningMessage'
import LoanFilter from "./filter"
import AsideFilter from './asideFilter'
import LoanCard from '../LoanCard'

import './loanList.scss'


export const loansQuery = gql`
  query loans($limit: Int!, $start: Int!) {
    loans(sort: "createdAt:desc", start: $start, limit: $limit) {
      loanName
      id
      rate
      amountMin
      amountMax
      termMin
      termMax
      createdAt
      offerApproval
      offerTime
      action {
        actionName
        color
      }
      accounts {
        name
        logo {
          url
        }
      }
      logo {
        url
      }
    }
    loansConnection {
      aggregate {
        count
      }
    }
  }
`

export const loansQueryVars = {
  start: 0,
  limit: 10
}

function loadMoreLoans(loans, fetchMore) {
  fetchMore({
    variables: {
      skip: loans.length
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return previousResult
      }
      return Object.assign({}, previousResult, {
        // Append the new loans results to the old one
        loans: [...previousResult.loans, ...fetchMoreResult.loans]
      })
    }
  })
}
const LoanList = (props) => {
  return (
    <Query query={loansQuery} variables={loansQueryVars}>
      {({ loading, error, data, fetchMore }) => {
        if (!data)  return <WarningMessage message='Займы не добавлены.' />
        if (error) return <ErrorMessage message='Error loading loans.' />
        if (loading) return <div>Loading</div>
        const  { loans, loansConnection } = data
        const areMoreLoans = loans.length < loansConnection.aggregate.count
        return (
          <React.Fragment>
            <Container className="filter-container"><LoanFilter /></Container>
            <Grid spacing={3} container component='section' className='rootGrid'>
              <Grid className='filtered-content' item xs={12} md={8} lg={9} container component='ul' direction='column'>
                {loans.map((loan, index) => (
                    <LoanCard key={index} {...loan} />
                ))}
              </Grid>
              <Grid item xs={12} md={4} lg={3} className=''>
                {props.aside || <AsideFilter/>}
              </Grid>
              {areMoreLoans ? (
                <button onClick={() => loadMoreLoans(loans, fetchMore)}>
                  {' '}
                  {loading ? 'Loading...' : 'Show More'}{' '}
                </button>
              ) : (
                  ''
                )}
            </Grid>
          </React.Fragment>
        )
      }}
    </Query>
  )
}

export default LoanList
