import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import {API_HOST} from './const'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

function create (initialState) {
    const isBrowser = typeof window !== 'undefined'
    return new ApolloClient({
        connectToDevTools: isBrowser,
        ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink({
            uri: API_HOST + 'graphql', // Server URL (must be absolute)
            credentials: 'same-origin',
            fetch: !isBrowser && fetch,
        }),
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo (initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return create(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}