import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

import { withAuthenticator } from 'aws-amplify-react'

class App extends Component {
  state = {
    name: ''
  }
  componentDidMount() {
    API.graphql(graphqlOperation(listTodos))
    .then(data => console.log('data from api: ', data))
    .catch(err => console.log('err', err))
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  createTodo = async () => {
    try {
      await API.graphql(graphqlOperation(createTodo, {input: this.state}))
      console.log('todo created...')
    } catch (err) {
      console.log('error creating todo..', err)
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <input name='name' onChange={this.onChange} />
          <button
            onClick={this.createTodo}
          >Create Todo</button>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
