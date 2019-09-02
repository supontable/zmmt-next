import React from 'react'
import Head from 'next/head'
import Layout from "../components/common/Layout"
import LoanList from "../components/LoanList"
import TopWidget from '../components/common/widgets/topWidget'
import BlogWidget from '../components/common/widgets/blogWidget'
import ApplyWidget from '../components/common/widgets/applyWidget'
const Home = () => (
  <React.Fragment>
    <Head>
      <title>Home</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Layout>
      <LoanList aside={
        <React.Fragment>
                {/* <TopWidget  widgetList={[{},{},{},{},{}]} /> */}
          <ApplyWidget />
          <BlogWidget title='Полезные материалы' expanderTitle='Все статьи' widgetList={[{ createdAt: '2020-01-01', title: 'ipsum lorum' }, { createdAt: '2020-01-01', title: 'ipsum lorum' }]} />
          <BlogWidget title='Новости' expanderTitle='Остальные новости' widgetList={[{ createdAt: '2020-01-01', title: 'ipsum lorum' }, { createdAt: '2020-01-01', title: 'ipsum lorum' }]} />
        </React.Fragment>
      } />
    </Layout>
  </React.Fragment>
)

export default Home
