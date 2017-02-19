import React from 'react';

export default class BtnDelete extends React.Component {
  render() {
    return (
      <div>
        {this.props.hovered && <div className="book__btnDelete">Delete</div>}
      </div>
    );
  }
}
