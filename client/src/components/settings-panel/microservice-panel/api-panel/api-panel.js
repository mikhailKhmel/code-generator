import React, { Component } from 'react'

import './api-panel.css'
import AddApiPanel from '../add-api-panel/add-api-panel'

export default class ApiPanel extends Component {
  constructor (props) {
    super(props)
    this.state = { api: [], addApiPanel: false }
    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
    this.handleAddApi = this.handleAddApi.bind(this)
    this.handleCloseAddApi = this.handleCloseAddApi.bind(this)
  }

  handleBackApiPanel () {
    this.props.onBackApiPanel()
  }

  handleAddApi () {
    this.setState({ addApiPanel: true })
  }

  handleCloseAddApi () {
    this.setState({ addApiPanel: false })
  }

  render () {
    if (this.state.addApiPanel) {
      return <AddApiPanel onCloseApiAddPanel={this.handleCloseAddApi} />
    }
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
          <button className='btn-element' onClick={this.handleAddApi}>Добавить API</button>
          <button className='btn-element'>Сохранить</button>
        </div>
      </div>

    )
  }
}
