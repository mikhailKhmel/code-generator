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
        <div className='row'>
          <button className='btn-back' onClick={this.handleBackApiPanel}>
            Назад
          </button>
          <div className='object-type'>
            Настройка API
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Тип запроса</td>
              <td>Имя метода обработки запроса</td>
              <td>Запрос</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td>getUsers</td>
              <td>/api/users</td>
            </tr>
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element'>Добавить API</button>
          <button className='btn-element'>Сохранить</button>
        </div>
      </div>

    )
  }
}
