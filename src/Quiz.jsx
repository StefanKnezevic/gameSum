/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import QuizOptions from './QuizOptions'
import classNames from 'classnames'

class App extends Component {
  constructor(props) {
    super(props);
    let riddle = this.playGame()
    let correct = false
    let gameover = false

    this.state = { riddle, correct, gameover }

    this.renderOptions = this.renderOptions.bind(this)
    this.checkResult = this.checkResult.bind(this)
    this.renderMessage = this.renderMessage.bind(this)
    this.playAgain = this.playAgain.bind(this)
  }
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  generateRandomOption(sum) {
    let resultArray = []
    let randomNumberArray = []

    while (randomNumberArray.length <= 3) {
      let randomNumber = this.randomNumber(1, 19)
      if (randomNumberArray.indexOf(randomNumber) > -1) continue
      randomNumberArray.push(randomNumber)
    }

    for (let i = 0; i < 3; i++) {
      let addSubrtact = this.randomNumber(0, 1)
      let result = sum
      if (addSubrtact === 1) {
        // Add to result
        result += randomNumberArray[i]
        resultArray.push(result)
      } else {
        // subtract from result
        result -= randomNumberArray[i]
        resultArray.push(result)
      }
    }
    return resultArray
  }
  playGame() {
    let field1 = this.randomNumber(20, 50)
    let field2 = this.randomNumber(20, 50)
    let result = field1 + field2
    let resultArray = this.generateRandomOption(result)
    resultArray.push(result)
    resultArray.sort((a, b) => { return 0.5 - Math.random() })
    let riddle = {
      array: resultArray,
      field1: field1,
      field2: field2,
      result: result
    }
    if (this.state && this.state.gameover) {
      this.setState({ riddle })
    } else {
      return riddle
    }
  }
  checkResult(option) {
    if (this.state.riddle.result === option) {
      console.log("true");
      this.setState({ correct: true, gameover: true })
    } else {
      console.log("false");
      this.setState({ correct: false, gameover: true })
    }
  }
  renderOptions() {
    return (
      <div className="options">
        {this.state.riddle.array.map((option, i) => {
          return <QuizOptions option={option} key={i} checkResult={(option) => { this.checkResult(option) }} />
        }
        )}
      </div>
    )
  }
  renderMessage() {
    if (this.state.correct) {
      return <h3> Good JOB! Hit the button below to Play again</h3>
    } else {
      return <h3> ohhh ohhhh Hit the button below to Play again</h3>
    }
  }
  playAgain() {
    this.setState({ correct: false, gameover: false })
    this.playGame()
  }
  render() {
    return (
      <div className="quiz">
        <div className="quiz-content">
          <p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span> ?</p>
          {this.renderOptions()}
        </div>
        <div className={classNames('after animated zoomIn', { 'hide': !this.state.gameover }, { 'correct': this.state.correct }, { 'wrong': !this.state.correct })} >
          {this.renderMessage()}
        </div>
        <div className="play-again">
          <a href="#" className="button" onClick={this.playAgain}>Play again</a>
        </div>
      </div >
    )
  }
}

export default App;