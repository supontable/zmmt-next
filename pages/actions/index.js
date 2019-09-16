import React from 'react'
import Head from 'next/head'
import Layout from "../../components/common/Layout"
import ActionList from "../../components/ActionList"
import SubscribeAction from '../../components/SubscribeAction'
import CBCrumb from '../../components/common/CBCrumb'
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core'

const Actions = () => (
    <React.Fragment>
        <Head>
            <title>Actions</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout collapsed>
            <CBCrumb></CBCrumb>
            <Box my={4}>
                <Typography gutterBottom variant="h4" component="h1">
                    Свежие акции
                </Typography>
                <Typography gutterBottom component="h2">
                    Наши редакторы специально для вас собрали самые свежие акции на рынке микрокредитования, которые помогут вам быть в курсе событий.
                </Typography>
            </Box>
            <SubscribeAction></SubscribeAction>
            <ActionList />
        </Layout>
    </React.Fragment>
)

export default Actions
