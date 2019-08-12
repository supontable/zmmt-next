import React from 'react'
import { Container } from '@material-ui/core';
import Header from "../Header"
import Footer from "../Footer"

const Layout = (props) => {
  return (
    <div className='layout'>
      <Header collapsed={props.collapsed} />
      <Container maxWidth='lg'>
          {props.children}
      </Container>
      <Footer />
      <style jsx>{`
              .layout {
                  background-color: #f9f9fa;
              }
              .container {
                display: flex;
                flex-flow: column;
                align-items: center;
              }
            `}</style>
      <style global jsx>{`
             body {
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
                Helvetica, sans-serif;
              }
              .layout {
                display: flex;
                flex-flow: column;
                min-height: 100vh;
              }
              .container > section {
                width: 1224px;
              }
        `}</style>
    </div>

  )
}

export default Layout
