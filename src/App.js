import React from 'react';
import './App.css';

function SearchForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={props.username}
          onChange={props.handleChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      username: '',
    };
  }

  fetchGithubUsers(username) {
    if (this.state.username !== '') {
      fetch('https://api.github.com/users/' + username, {method: 'GET'})
      .then(response => response.json())
      .then(data => this.setState({
        result: data,
      }));

      console.log(this.state.result)
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchGithubUsers(this.state.username)
  }

  handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <div className="App-intro">
        <SearchForm
          username={this.state.username}
          handleSubmit={(e) => this.handleSubmit(e)}
          handleChange={(e) => this.handleChange(e)}
        />
        {JSON.stringify(this.state.result)}
      </div>
    );
  }
}

export default App;
