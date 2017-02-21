import React from 'react';
// import classNames from 'classnames';

import BtnDelete from './BtnDelete';
import BtnRequest from './BtnRequest';
import Button from './Button';

export default class Book extends React.Component {

  render() {
    // console.log('Book props', this.props);
    const cover = {
      backgroundImage: `url(${this.props.book.coverUrl})`,
      backgroundSize: 'cover'
    }
    const { book, user } = this.props;
    // console.log('Book, user', user);
    return (
      <div className="book__container">
        <div
          className="book__cover"
          title={`${this.props.book.title}\nby ${this.props.book.author}`}
          style={cover}
        >
          {!this.props.book.coverUrl && this.props.book.author}<br/>
          {!this.props.book.coverUrl && this.props.book.title}
          {!book._requestedBy && <BtnRequest {...this.props} hovered={true} />}
          {this.props.showDelete && <BtnDelete {...this.props} hovered={true} />}
          {this.props.requests &&
            <Button
              caption={'Cancel'}
              color={'red'}
              top={5}
              show={true}
              handleClick={this.props.deleteTradeRequest}
            />}
          {(this.props.requests && user._id !== book._requestedBy) &&
            <Button
              caption={'Confirm'}
              color={'cornflowerblue'}
              top={30}
              show={true}
              handleClick={this.props.confirmTradeRequest}
            />}
        </div>
        {/* <div className="book__footer">
          {this.props.book.title}<br/>
          by {this.props.book.author}
        </div> */}
      </div>
    )
  }
}
