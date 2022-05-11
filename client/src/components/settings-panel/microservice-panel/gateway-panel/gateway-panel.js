import React, { Component } from 'react'
import AddGatewayPanel from '../add-gateway-panel/add-gateway-panel'

import './gateway-panel.css'

export default class GatewayPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      redirects: [],
      openAddGatewayPanel: false,
      editRedirect: ''
    }

    this.handleAddGatewayPanel = this.handleAddGatewayPanel.bind(this)
    this.handleSaveAddGateway = this.handleSaveAddGateway.bind(this)
    this.handleEditRedirect = this.handleEditRedirect.bind(this)
  }

  componentDidMount () {
    this.setState({
      redirects: this.props.redirects === undefined ? [] : this.props.redirects,
      openAddGatewayPanel: false,
      editRedirect: ''
    })
  }

  handleAddGatewayPanel (value) {
    this.setState({ openAddGatewayPanel: value })
  }

  handleSaveAddGateway (redirect) {
    const realRedirect = this.state.redirects.find(x => x.id === redirect.id)
    if (realRedirect) {
      const realRedirectIdx = this.state.redirects.findIndex(x => x.id === redirect.id)
      this.setState(st => ({
        openAddGatewayPanel: false,
        editRedirect: '',
        redirects: [
          ...st.redirects.slice(0, realRedirectIdx),
          redirect,
          ...st.redirects.slice(realRedirectIdx + 1)
        ]
      }))
      return
    }
    this.setState(st => ({ openAddGatewayPanel: false, editRedirect: '', redirects: [...st.redirects, redirect] }))
  }

  handleEditRedirect (key) {
    this.setState({ openAddGatewayPanel: true, editRedirect: this.state.redirects.find(x => x.id === key) })
  }

  render () {

    if (this.state.openAddGatewayPanel) {
      return (
        <AddGatewayPanel
          redirect={this.state.editRedirect}
          onCloseAddGatewayPanel={() => this.handleAddGatewayPanel(false)}
          onSaveAddGateway={this.handleSaveAddGateway}
        />
      )
    }

    return (
      <div className="gateway-panel">
        <div className="gateway-row">
          <p className="gateway-title">Настройки перенаправления</p>
          <button
            className="btn-close"
            onClick={() => this.props.onCloseGatewayPanel()}
          />
        </div>
        <div className="gateway-row">
          <table className="gateway-table">
            <thead>
            <tr>
              <td>Входящий запрос</td>
              <td>Выходящий запрос и порт</td>
            </tr>
            </thead>
            <tbody>
            {this.state.redirects.map(x => {
              return (
                <tr
                  key={x.id}
                  className="table-row"
                  onDoubleClick={() => this.handleEditRedirect(x.id)}
                >
                  <td>{x.upstreamRequest}</td>
                  <td>{x.downstreamRequest}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        <button className="btn-add-gateway" onClick={() => this.handleAddGatewayPanel(true)}>Добавить перенаправление
        </button>
        <button className="btn-save" onClick={() => this.props.onSaveGatewayRedirects(this.state.redirects)}>Сохранить
        </button>
      </div>
    )
  }
}
