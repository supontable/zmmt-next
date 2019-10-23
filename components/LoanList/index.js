import { Query } from '@apollo/react-components'
import gql from 'graphql-tag'
import { Grid, Container, CircularProgress } from '@material-ui/core';
import ErrorMessage from '../ErrorMessage'
import WarningMessage from '../WarningMessage'
import LoanFilter from "./LoanFilter"
import AsideFilter from './AsideFilter'
import LoanCard from '../LoanCard'

import './loanList.scss'
import FastFiler from './FastFilter';
import { useQuery } from '@apollo/react-hooks';


export const GET_LOANS = gql`
  query loans($limit: Int!, $start: Int!, $where: JSON) {
    loans(sort: "createdAt:desc", start: $start, limit: $limit, where: $where) {
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
      href
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
const GET_FILTERS = gql`
  query loanfilters {
    loanfilters {
      sliders
      links
    }
  }
`

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
  const { loading: loadingFilters, error: errorFilters, data: dataFilters } = useQuery(GET_FILTERS);
  if (loadingFilters) return <React.Fragment>Loading</React.Fragment>
  const {sliders, links} = !errorFilters && dataFilters.loanfilters[0]
  const loansQueryVars = {
    start: 0,
    limit: 10,
  }
  return (
    <Query query={GET_LOANS} variables={loansQueryVars}>
      {({ loading, error, data, fetchMore, refetch }) => {
        if (!data) return <WarningMessage message='Займы не добавлены.' />
        if (error) return <ErrorMessage message='Ошибка при загрузке' />
        const loans = !loading ? data.loans : []
        const loansConnection = !loading ? data.loansConnection : false
        const areMoreLoans = loansConnection ? loans.length < loansConnection.aggregate.count : false
        return (
          <React.Fragment>
            <Container className="filter-container">
              <LoanFilter handleRefetch={refetch} slidersScope={sliders} />
            </Container>
            <Grid spacing={3} container component='section' className='rootGrid'>
              <Grid className='filtered-content' item xs={12} md={8} lg={9} container component='ul' direction='column'>
                {props.aside && <FastFiler linkList={links} />}
                {!loading ? loans.map((loan, index) => (
                  <LoanCard key={index} {...loan} />
                )) : <CircularProgress className='progress' />}
              </Grid>
              <Grid item xs={12} md={4} lg={3} className=''>
                {props.aside || <AsideFilter />}
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
