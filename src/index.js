
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {SimpleLineChart} from './graph.js'

import 'reset-css'
import './style.css'

class App extends Component {

  state = {
    heading : 'Ready to Start?',
    body : 'This test will perform a basic diagnostic test of your hearing and generate your unique hearing profile!',
    count : 10,
    availableStateChange : 'PAUSE',
    modalVisible : false
  }

  constructor(props) {
    super(props)

    WebFont.load({
      google : {
        families : [ 'Raleway', 'Gamja Flower', 'Do Hyeon' ]
      }
    })
  }

  render() {
    return (
      <div className='granddaddy'>
        <div className='wrapper'>
          <div className='header'>
            <div>
              <h1>BETTER LISTEN</h1>
              <h3>learn about your hearing</h3>
            </div>
            <div>
              <a
                className='find-a-specialist'
                href='https://www.earq.com/locator'
                target='_blank'
              >
                find a specialist near you
              </a>
            </div>
          </div>
          <div className='main'>
            <div className='center'>
              <div className='heading'>{ this.state.heading }</div>
              <div className='body'>{ this.state.body }</div>
              <div className='action bad'></div>
              <div className='action good'>some action</div>
            </div>
          </div>
          <div className='footer'>
            <div>{ this.state.count }</div>
            <div>{ this.state.availableStateChange }</div>
          </div>
        </div>
        <div id="modal" className={ this.state.modalVisible ? 'visibleModal' : 'hiddenModal' }>
          {
            this.state.modalVisible
              ? <SimpleLineChart />
              : null
          }
        </div>
      </div>
    )
  }

  _countDown = (seconds) => {
    let count = seconds
    setTimeout(() => {
      count--
      this.setState({ count })
    }, seconds * 1000)
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
