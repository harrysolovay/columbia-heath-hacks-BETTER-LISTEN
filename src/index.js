
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'

import 'reset-css'
import './style.css'

class App extends Component {

  state = {
    heading : 'test heading',
    body : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
              <div className='action bad'>some action</div>
              <div className='action good'>some action</div>
            </div>
          </div>
          <div className='footer'>
            <div>{ this.state.count }</div>
            <div>{ this.state.availableStateChange }</div>
          </div>
        </div>
        <div className={ this.state.modalVisible ? 'visibleModal' : 'hiddenModal' }>
          modal
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