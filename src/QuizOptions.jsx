import React, { Component } from 'react'

class QuizOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.callParentCheck = this.callParentCheck.bind(this)
  }
  callParentCheck() {
    this.props.checkResult(this.props.option)

  }
  render() {
    return (
      <div className="fields animated zoomIn" onClick={this.callParentCheck}>
        <div className="field-block">{this.props.option}</div>
      </div>
    );
  }
}
export default QuizOptions