import React, { Component } from 'react'

import './add-api-panel.css'

export default class AddApiPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: 0,
      type: 'get',
      request: ''
    }

    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
    this.handleChangeType = this.handleChangeType.bind(this)
    this.handleChangeRequest = this.handleChangeRequest.bind(this)
    this.handleSaveRequest = this.handleSaveRequest.bind(this)
  }

  componentDidMount () {
    if (this.props.api) {
      const { id, type, request } = this.props.api
      this.setState({ id, type, request })
    }
  }

  handleBackApiPanel (event) {
    event.preventDefault()
    this.props.onCloseApiAddPanel()
  }

  handleChangeType (event) {
    event.preventDefault()
    this.setState({ type: event.target.value })
  }

  handleChangeRequest (event) {
    event.preventDefault()
    this.setState({ request: event.target.value })
  }

  handleSaveRequest (event) {
    event.preventDefault()
    const api = this.state
    if (this.props.api) {
      this.props.onSaveRequest(api)
      return
    }
    api.id = Math.floor(Math.random() * 100)
    this.props.onSaveRequest(api)
  }

  render () {
    return (
      <div className="add-api-panel">
        <div className="row">
          <button className="btn-back" onClick={this.handleBackApiPanel}>
            Назад
          </button>
          <div className="object-type">
            Добавление нового запроса
          </div>
        </div>
        <div className="row">
          Тип запроса
          <select className="select-type" value={this.state.type} onChange={this.handleChangeType}>
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="patch">PATCH</option>
            <option value="delete">DELETE</option>
          </select>
        </div>
        <div className="row">
          Путь запроса
          <input type="text" className="input-request" value={this.state.request} onChange={this.handleChangeRequest}/>
        </div>
        <button className="btn-save" value="Сохранить" onClick={this.handleSaveRequest}>Добавить</button>
      </div>
    )
  }
}
