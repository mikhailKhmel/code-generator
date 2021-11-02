import React, {Component} from 'react'

import './add-api-panel.css'

export default class AddApiPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'get',
      method: '',
      request: ''
    }

    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleChangeMethod = this.handleChangeMethod.bind(this)
    this.handleChangeRequest = this.handleChangeRequest.bind(this)
  }

  handleBackApiPanel (event) {
    event.preventDefault()
    this.props.onCloseApiAddPanel()
  }

  handleChangeType (event) {
    event.preventDefault()
    this.setState({ type: event.target.value })
  }

  handleChangeMethod (event) {
    event.preventDefault()
    this.setState({ method: event.target.value })
  }

  handleChangeRequest (event) {
    event.preventDefault()
    this.setState({ request: event.target.value })
  }

  render () {
    return (
      <div className='add-api-panel'>
        <div className='row'>
          <button className='btn-back' onClick={this.handleBackApiPanel}>
            Назад
          </button>
          <div className='object-type'>
            Добавление нового запроса
          </div>
        </div>
        <div className='row'>
          Тип запроса
          <select className='select-type' value={this.state.type} onChange={this.handleChangeType}>
            <option value='get'>GET</option>
            <option value='put'>PUT</option>
            <option value='patch'>PATCH</option>
            <option value='delete'>DELETE</option>
          </select>
        </div>
        <div className='row'>
          Имя метода
          <input type='text' className='input-method' value={this.state.method} onChange={this.handleChangeMethod} />
        </div>
        <div className='row'>
          Запрос
          <input type='text' className='input-request' value={this.state.request} onChange={this.handleChangeRequest} />
        </div>
        <button className='btn-save' value='Сохранить'>Добавить</button>
      </div>
    )
  }
}
