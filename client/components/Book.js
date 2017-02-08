import React from 'react';

export default class Book extends React.Component {
  render() {
    // console.log('Book props', this.props);
    return (
      <div className='book'>
        {this.props.book.author}<br/>
        {this.props.book.title}
      </div>
    )
  }
}
