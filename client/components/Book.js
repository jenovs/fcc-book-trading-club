import React from 'react';
import classNames from 'classnames';

import BtnDelete from './BtnDelete';
import BtnRequest from './BtnRequest';
import Button from './Button';

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
    const { book, user } = this.props;
    // console.log('Book, user', user);
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
        {this.props.showDelete && <BtnDelete {...this.props} hovered={this.state.hovered} />}
        {this.props.requests &&
          <Button
            caption={'Cancel'}
            color={'red'}
            top={5}
            show={this.state.hovered}
            handleClick={this.props.deleteTradeRequest}
          />}
        {(this.props.requests && user._id !== book._requestedBy) &&
          <Button
            caption={'Confirm'}
            color={'cornflowerblue'}
            top={30}
            show={this.state.hovered}
            handleClick={this.props.confirmTradeRequest}
          />}
      </div>
    )
  }
}
