import React from 'react';
// import classNames from 'classnames';

export default class BtnRequest extends React.Component {
  render() {
    return (
      <div onClick={this.props.createTradeRequest}>
        {((this.props.user && (this.props.book._owner._id !== this.props.user._id)) && this.props.hovered) && <div className="book__btnRequest">Request</div>}
      </div>
    )
  }
}
