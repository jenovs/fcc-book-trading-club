import React from 'react';
import classNames from 'classnames';

import BtnDelete from './BtnDelete';
import BtnRequest from './BtnRequest';

export default class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
    this.handleHover = this.handleHover.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
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

  toggleHover() {
    this.setState({
      hovered: !this.state.hovered
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
    const { book } = this.props;
    return (
      <div
        className={bookClass}
        title={`${this.props.book.author}\n${this.props.book.title}`}
        style={cover}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleUnhover}
        onTouchStart={this.toggleHover}>
        {!this.props.book.coverUrl && this.props.book.author}<br/>
        {!this.props.book.coverUrl && this.props.book.title}
        {!book._requestedBy && <BtnRequest {...this.props} hovered={this.state.hovered} />}
        {this.props.showDelete && <BtnDelete hovered={this.state.hovered} />}
      </div>
    )
  }
}
