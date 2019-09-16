import React from 'react'
import Head from 'next/head'
import Layout from "../../components/common/Layout"
import LoanList from "../../components/LoanList"
import CBCrummb from '../../components/common/CBCrumb'
const Loans = () => (
  <React.Fragment>
    <Head>
      <title>Loans</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Layout collapsed>
      <CBCrummb/>
      <LoanList/>
    </Layout>
  </React.Fragment>
)

export default Loans
