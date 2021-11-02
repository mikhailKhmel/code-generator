import React, { Component } from 'react'

import './api-panel.css'

export default class ApiPanel extends Component {
  constructor (props) {
    super(props)
    this.state = []
    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
  }

  handleBackApiPanel () {
    this.props.onBackApiPanel()
  }

  render () {
    return (
      <div className='api-panel'>
        <button className='btn-back' onClick={this.handleBackApiPanel}>
          Назад
        </button>
      </div>

    )
  }
}
