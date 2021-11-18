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
    this.handleSaveRequest = this.handleSaveRequest.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
  }

  componentDidMount () {
    console.log('mount api panel', this.props)
    this.setState({ api: this.props.apiData, addApiPanel: false })
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
    this.setState(st => ({ api: st.api === undefined ? [].concat([request]) : st.api.concat([request]), addApiPanel: false }))
  }

  handleSaveData () {
    this.props.onSaveApi(this.state.api)
  }

  render () {
    if (this.state.addApiPanel) {
      return <AddApiPanel onCloseApiAddPanel={this.handleCloseAddApi} onSaveRequest={this.handleSaveRequest} />
    }
    console.log('render api panel', this.state)
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
            </tr>
          </thead>
          <tbody>
            {
              this.state.api !== undefined
                ? this.state.api.map(x => {
                    return (
                      <tr key={`${x.type}_${x.method}_${x.request}`}>
                        <td>{x.type.toUpperCase()}</td>
                        <td>{x.request}</td>
                      </tr>
                    )
                  })
                : null
            }
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element' onClick={this.handleAddApi}>Добавить API</button>
          <button className='btn-element' onClick={this.handleSaveData}>Сохранить</button>
        </div>
      </div>

    )
  }
}
