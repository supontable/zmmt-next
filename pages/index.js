import React from 'react'
import Head from 'next/head'
import Layout from "../components/common/Layout"
import LoanList from "../components/LoanList"
import TopWidget from '../components/common/widgets/topWidget'
import BlogWidget from '../components/common/widgets/blogWidget'
import ApplyWidget from '../components/common/widgets/applyWidget'
import ApplyForm from '../components/ApplyForm'
import InfoSection from '../components/InfoSection'
import SubscribeAction from '../components/SubscribeAction'

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ActionList from '../components/ActionList'
const mainContentQuery = gql`
  query mainpagecontents {
    mainpagecontents {
      sectionName,
      subHeader,
      content,
      type,
      moreContent
    }
  }
`
const Home = () => {
  const { loading, error, data } = useQuery(mainContentQuery);
  if (loading) return <React.Fragment>Loading</React.Fragment>
  const contentList = data.mainpagecontents
  const mainInfo = contentList.find(item => item.type === 'main')
  const advantages = contentList.find(item => item.type === 'advantages')
  const requirements = contentList.find(item => item.type === 'requirements')
  const how = contentList.find(item => item.type === 'how')
  const paymentGates = contentList.find(item => item.type === 'paymentGates')
  const returnGate = contentList.find(item => item.type === 'returnGate')
  console.log(returnGate)
  return (
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
        {/* <ApplyForm></ApplyForm> */}
        <InfoSection {...mainInfo} />
        <SubscribeAction />
        <ActionList showButton />
        <InfoSection {...advantages} />
        <InfoSection {...requirements} />
        <InfoSection {...how} />
        <InfoSection {...paymentGates} />
        <SubscribeAction />
        <InfoSection {...returnGate} />
      </Layout>
    </React.Fragment>
  )
}
export default Home
