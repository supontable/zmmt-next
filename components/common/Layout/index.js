import React from 'react'
import { Container } from '@material-ui/core';
import Header from "../Header"
import Footer from "../Footer"
import './index.scss'

const Layout = (props) => {
  return (
    <div className='layout'>
      <Header collapsed={props.collapsed} />
      <Container maxWidth='lg'>
          {props.children}
      </Container>
      <Footer />
    </div>

  )
}

export default Layout
