
import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'
import {SimpleLineChart} from './graph.js'
import Tone from 'tone'
import {StreamgraphExample, generateData} from './streamgraph-example.js'

import 'reset-css'
import './style.css'

var START_VOL = -50
var START_TONE = 250
var LAST_TONE = START_TONE * 8

function prettify(obj)
{
  var od = new Object;
  var result = "";
  var len = 0;

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        value = "[ " + value + " ]";
      }
      else
      {
        var ood = prettify(value);
        value = "{ " + ood + " }";
      }
    }
    result += "'" + property + "' : " + value + ", ";
    len++;
  }
  return result.replace(/, $/, "");
}

class App extends Component {


  state = {
    heading : 'Ready to Start?',
    body : 'This test will perform a basic diagnostic test of your hearing and generate your unique hearing profile.',
    count : 10,
    availableStateChange : 'PAUSE',
    modalVisible : false,
    introVisible : true,
    testButtonVisible : false,
    tone : START_TONE,
    vol : START_VOL
  }

  constructor(props) {
    super(props)

    WebFont.load({
      google : {
        families : [ 'Raleway', 'Gamja Flower', 'Do Hyeon' ]
      }
    })

    this.synth = new Tone.Synth().toMaster();
    //this.volKnob = new Tone.Volume(this.state.vol);
    //this.synth.chain(this.volKnob, Tone.Master);

    this.volCallback = null;

    this.acuity = [];
  }

  testTone() {
    this.synth.volume.value = this.state.vol;
    this.synth.triggerAttackRelease(this.state.tone, "4n");
    this.volCallback = setTimeout(
      this.advanceVol.bind(this), 4000
    )
  }

  startTest() {
    this.setState(
      Object.assign(
        {},
        this.state,
        {introVisible : false,
        testButtonVisible : true,
        heading : 'Testing',
        body : ''}
      )
    )
    this.testTone()
  }

  advanceTone() {
    this.acuity.push(
      {
      freq : this.state.tone,
      vol : this.state.vol
      }
    );
    if (this.state.tone < LAST_TONE)
    {
      this.setState(
        Object.assign(
          {},
          this.state,
          {tone : this.state.tone * 2,
          vol : START_VOL}
        )
      )

      clearTimeout(this.volCallback);
      setTimeout(
        this.testTone.bind(this), Math.random()*1000+1000
      )
    }
    else {
      clearTimeout(this.volCallback);
      this.showGraph()
    }
  }

  advanceVol() {
    this.setState(
      Object.assign(
        {},
        this.state,
        {vol : this.state.vol + 10}
      )
    )
    setTimeout(
      this.testTone.bind(this), Math.random()*1000+1000
       )
  }

  showGraph() {
    alert(prettify(this.acuity))
    this.setState(
      Object.assign(
        {},
        this.state,
        {modalVisible : true,
          introVisible : false,
        testButtonVisible : false}
      )
    )
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
            {
              this.state.introVisible && <React.Fragment>
                <div className='action good' onClick={this.startTest.bind(this)}>Start!</div>
              </React.Fragment>
            }

            {
              this.state.testButtonVisible &&
              <div className='action good' onClick={this.advanceTone.bind(this)}>Click every time you hear a tone.</div>
            }

            </div>
          </div>
          {/*
            <div className='footer'>
             <div>{ this.state.count }</div>
             <div>{ this.state.availableStateChange }</div>
           </div>
           */}
        </div>
        <div id="modal" className={ this.state.modalVisible ? 'visibleModal' : 'hiddenModal' }>
          {
            this.state.modalVisible
              ?
              <React.Fragment>
                <SimpleLineChart data={this.acuity} />
                <StreamgraphExample acuity={this.acuity} data={generateData(this.acuity)} />
              </React.Fragment>
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
