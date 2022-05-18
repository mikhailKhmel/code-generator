import React, { Component } from 'react'

import './api-panel.css'
import AddApiPanel from '../add-api-panel/add-api-panel'

export default class ApiPanel extends Component {
  constructor (props) {
    super(props)
    this.state = { api: [], addApiPanel: false, editRequest: '' }
    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
    this.handleAddApi = this.handleAddApi.bind(this)
    this.handleCloseAddApi = this.handleCloseAddApi.bind(this)
    this.handleSaveRequest = this.handleSaveRequest.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
  }

  componentDidMount () {
    console.log('mount api panel', this.props)
    this.setState({ api: this.props.apiData, addApiPanel: false, editRequest: '' })
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

  handleSaveRequest (request) {
    console.log(this.state)
    if (this.state.api) {
      const realRequest = this.state.api.find(x => x.id === request.id)
      if (realRequest) {
        const realRequestIdx = this.state.api.findIndex(x => x.id === request.id)
        this.setState(st => ({
          addApiPanel: false,
          api: [
            ...st.api.slice(0, realRequestIdx),
            request,
            ...st.api.slice(realRequestIdx + 1)
          ]
        }))
        return
      }
      this.setState(st => ({ addApiPanel: false, editRequest: '', api: [...st.api, request] }))
    } else {
      this.setState(st => ({ addApiPanel: false, editRequest: '', api: [request] }))
    }
  }

  handleSaveData () {
    this.props.onSaveApi(this.state.api)
  }

  handleEditRequest (key) {
    this.setState({ addApiPanel: true, editRequest: this.state.api.find(x => x.id === key) })
  }

  render () {
    if (this.state.addApiPanel) {
      return <AddApiPanel api={this.state.editRequest} onCloseApiAddPanel={this.handleCloseAddApi}
                          onSaveRequest={this.handleSaveRequest}/>
    }
    console.log('render api panel', this.state)
    return (
      <div className="api-panel">
        <div className="row">
          <button className="btn-back" onClick={this.handleBackApiPanel}>
            Назад
          </button>
          <div className="api-panel-title">
            Настройки API
          </div>
        </div>
        <table>
          <thead>
          <tr>
            <td>Тип запроса</td>
            <td>Путь запроса</td>
          </tr>
          </thead>
          <tbody>
          {
            this.state.api !== undefined
              ? this.state.api.map(x => {
                return (
                  <tr key={x.id} className="table-row" onClick={() => this.handleEditRequest(x.id)}>
                    <td>{x.type.toUpperCase()}</td>
                    <td>{x.request}</td>
                  </tr>
                )
              })
              : null
          }
          </tbody>
        </table>
        <div className="btn-group">
          <button className="btn-element" onClick={this.handleAddApi}>Добавить API</button>
          <button className="btn-element" onClick={this.handleSaveData}>Сохранить</button>
        </div>
      </div>

    )
  }
}
