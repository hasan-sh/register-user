import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import Register from './components/Register'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

const App = () => (
  <ApolloProvider client={client}>
    <Register />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()