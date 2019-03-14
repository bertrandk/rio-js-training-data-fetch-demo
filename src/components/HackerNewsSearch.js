import React from 'react';
import List from './List';
import ListItem from './ListItem';

const API = 'https://hn.algolia.com/api/v1/search?query=';

class HackerNewsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API + this.props.query)
      .then(r => r.json())
      .then(result => {
        return this.setState({
          results: result.hits,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }

  render() {
    let { results } = this.state;

    return (
      <List>
        {results.map(n => {
          return (
            <ListItem key={n.objectID}>
              <a href={n.url}>{n.title}</a>
            </ListItem>
          );
        })}
      </List>
    );
  }
}
HackerNewsSearch.defaultProps = {
  query: 'redux'
};

export default HackerNewsSearch;
