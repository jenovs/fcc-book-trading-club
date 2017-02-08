import React from 'react';

import Navbar from './Navbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      user: null
    }
  }

  componentWillMount() {
    this.getBooks();
    this.getCurrentUser();
  }

  getBooks() {
    fetch('/books')
      .then(res => res.json())
      .then(json => {
        this.setState({books: json})
      })
  }

  getCurrentUser() {
    fetch('/users')
      .then(res => res.json())
      .then(json => {
        // console.log(json.username);
        this.setState({user: json.username})
      })
  }

  render() {
    const props = {
      books: this.state.books
    };
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));
    return (
      <div>
        <Navbar user={this.state.user} />
        {childrenWithProps}
      </div>
    )
  }
}
