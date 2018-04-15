import React, { Component } from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class SimpleLineChart extends Component {
  render () {
    return (
      <LineChart width={600} height={300} data={this.props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="freq"/>
       <YAxis reversed={true} />
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="vol" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export { SimpleLineChart }
