import React from 'react';
import classNames from 'classnames';

export default class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
    this.handleHover = this.handleHover.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
  }

  handleHover() {
    this.setState({
      hovered: true
    })
  }
  handleUnhover() {
    this.setState({
      hovered: false
    })
  }

  render() {
    // console.log('Book props', this.props);
    const bookClass = classNames({
      'book': true,
      'book--hovered': this.state.hovered
    })
    return (
      <div className={bookClass} onMouseEnter={this.handleHover} onMouseLeave={this.handleUnhover}>
        {this.props.book.author}<br/>
        {this.props.book.title}
        {(this.props.deleteButton && this.state.hovered) && <div className='book__delete' title='Delete' onClick={this.props.deleteBook}>X</div>}
      </div>
    )
  }
}
