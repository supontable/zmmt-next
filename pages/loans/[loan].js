import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from "../../components/common/Layout"
import CBCrummb from '../../components/common/CBCrumb'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import LoanCardSingle from '../../components/LoanCardSingle';
const loanQuery = gql`
  query loan($id: ID!) {
    loan(id: $id) {
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
  }
`
const Loan = () => {
    const router = useRouter()
    const { loan, id } = router.query
    const { loading, error, data } = useQuery(loanQuery,
        {
            variables: { id: id },
            // Setting this value to true will make the component rerender when
            // the "networkStatus" changes, so we are able to know if it is fetching
            // more data
            notifyOnNetworkStatusChange: true
        });
    if (loading) return <React.Fragment>Loading</React.Fragment>
    const { loanName } = data.loan
    const loanProps = data.loan
    return (
        <React.Fragment >
            <Head>
                <title>{loan}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Layout collapsed>
                <CBCrummb currentPageName={loanName} />
                <LoanCardSingle {...loanProps} />
            </Layout>
        </React.Fragment >
    )
}

export default Loan