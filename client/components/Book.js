import React from 'react';
import classNames from 'classnames';

import BtnRequest from './BtnRequest';

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
    });
    const cover = {
      backgroundImage: `url(${this.props.book.coverUrl})`,
      backgroundSize: 'cover'
    }
    return (
      <div
        className={bookClass}
        title={`${this.props.book.author}\n${this.props.book.title}`}
        style={cover}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleUnhover}>
        {!this.props.book.coverUrl && this.props.book.author}<br/>
        {!this.props.book.coverUrl && this.props.book.title}
        {/* {((this.props.user && (this.props.book._owner._id === this.props.user._id)) && this.state.hovered) && <div className='book__delete' title='Delete' onClick={this.props.deleteBook}>X</div>} */}
        <BtnRequest {...this.props} hovered={this.state.hovered} />
      </div>
    )
  }
}
