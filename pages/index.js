import React from 'react'
import Head from 'next/head'
import Layout from "../components/common/layout"
import LoanList from "../components/LoanList"

const Home = () => (
  <React.Fragment>
    <Head>
      <title>Home</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Layout>
        <LoanList />
      </Layout>
  </React.Fragment>
)

export default Home
