import React, { Component } from 'react'

import './add-gateway-panel.css'

export default class AddGatewayPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      upstreamRequest: '',
      downstreamRequest: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSaveAddGateway = this.handleSaveAddGateway.bind(this)
  }

  componentDidMount() {
    if (this.props.redirect) {
      const { id, upstreamRequest, downstreamRequest } = this.props.redirect
      this.setState({ id, upstreamRequest, downstreamRequest })
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSaveAddGateway() {
    const redirect = this.state
    if (!this.props.redirect) {
      redirect.id = Math.floor(Math.random() * 100)
    }

    this.props.onSaveAddGateway(redirect)
  }

  render() {
    const { upstreamRequest, downstreamRequest } = this.state
    return (
      <div className="add-gateway-panel">
        <div className="add-gateway-row">
          <p className="add-gateway-title">Новое перенаправления</p>
          <button
            className="btn-close"
            onClick={() => this.props.onCloseAddGatewayPanel()}
          />
        </div>
        <span style={{'marginLeft': '30px'}}>Входящий запрос</span>
        <input className="add-gateway-input" name="upstreamRequest" type="text" placeholder="Входящий запрос"
          value={upstreamRequest} onChange={this.handleInputChange} />
        <span style={{'marginLeft': '30px'}}>Выходящий запрос</span>
        <input className="add-gateway-input" name="downstreamRequest" type="text" placeholder="Выходящий запрос"
          value={downstreamRequest} onChange={this.handleInputChange} />
        <button className="btn-save" onClick={this.handleSaveAddGateway}>Сохранить</button>
      </div>
    )
  }
}
