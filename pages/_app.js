import App, { Container } from 'next/app'
import React from 'react'
import mediaQuery from 'css-mediaquery'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from '@material-ui/styles';
import theme from '../lib/theme';
import { CssBaseline } from '@material-ui/core';

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }
    render() {
        const { Component, pageProps, apolloClient } = this.props
        const ssrMatchMedia = query => ({
            // Use https://github.com/ericf/css-mediaquery as ponyfill.
            matches: mediaQuery.match(query, {
                // The estimated CSS width of the browser.
                // For the sake of this demo, we are using a fixed value.
                //
                // In production, you can leverage:
                //
                // - Client hints. You can ask the client to send your server its width.
                // Be aware that this feature is not supported everywhere: https://caniuse.com/#search=client%20hint.
                // - User-agent. You can parse the user agent of the client, then convert the data to a
                // is mobile or is desktop variable, and finally, guess the most likely screen width of the client.
                width: 1280,
            }),
        });

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <ThemeProvider theme={{
                        ...theme, props: {
                            MuiUseMediaQuery: { ssrMatchMedia },
                        }
                    }}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withApolloClient(MyApp)