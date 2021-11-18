import React, { Component } from 'react'

import './gateway-panel.css'

export default class GatewayPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
    return (
      <div className='gateway-panel'>
        <div className='gateway-row'>
          <p className='gateway-title'>Настройки перенаправления</p>
          <button
            className='btn-close'
            onClick={() => this.props.onCloseGatewayPanel()}
          />
        </div>
        <div className='gateway-row'>
          <table>
            <thead>
              <tr>
                <td>Входящий запрос</td>
                <td>Выходящий запрос и порт</td>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>

      </div>
    )
  }
}
