import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Container } from '@material-ui/core';
import ErrorMessage from '../ErrorMessage'
import LoanFilter from "./filter"
import LoanCard from '../LoanCard'
import Aside from '../common/Aside'
import TopWidget from '../common/widgets/topWidget'
import BlogWidget from '../common/widgets/blogWidget'
import ApplyWidget from '../common/widgets/applyWidget'
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
const LoanList = () => {
  return (
    <Query query={loansQuery} variables={loansQueryVars}>
      {({ loading, error, data: { loans, loansConnection }, fetchMore }) => {
        if (error) return <ErrorMessage message='Error loading loans.' />
        if (loading) return <div>Loading</div>
        const areMoreLoans = loans.length < loansConnection.aggregate.count
        return (
          <React.Fragment>
            <Container className="filter-container"><LoanFilter /></Container>
            <Grid spacing={3} container component='section' className='rootGrid'>
              <Grid item xs={12} md={8} lg={9} component='ul'>
                {loans.map((loan, index) => (
                    <LoanCard key={index} {...loan} />
                ))}
              </Grid>
              <Grid item xs={12} md={4} lg={3} className=''>
                {/* <TopWidget  widgetList={[{},{},{},{},{}]} /> */}
                <ApplyWidget />
                <BlogWidget title='Полезные материалы' expanderTitle='Все статьи' widgetList={[{ createdAt: '2020-01-01', title: 'ipsum lorum' }, { createdAt: '2020-01-01', title: 'ipsum lorum' }]} />
                <BlogWidget title='Новости' expanderTitle='Остальные новости' widgetList={[{ createdAt: '2020-01-01', title: 'ipsum lorum' }, { createdAt: '2020-01-01', title: 'ipsum lorum' }]} />
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
