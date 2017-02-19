import React from 'react';

export default class Button extends React.Component {
  render() {
    const { caption, color, show, top } = this.props;
    const style = {
      top: `${top}%`,
      backgroundColor: color
    }
    return (
      <div onClick={this.props.handleClick}>
        {show && <div className="button--action" style={style}>{caption}</div>}
      </div>
    )
  }
}
