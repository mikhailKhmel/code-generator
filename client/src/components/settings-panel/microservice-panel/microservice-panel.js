import React, { Component } from 'react'
import ApiPanel from './api-panel/api-panel'
import GatewayPanel from './gateway-panel'

import './microservice-panel.css'

export default class MicroservicePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settings: {
        id: '',
        name: '',
        port: '',
        microserviceType: 'default',
        type: 'microservice',
        api: []
      },
      openApiPanel: false,
      openGatewayPanel: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenApiPanel = this.handleOpenApiPanel.bind(this)
    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
    this.handleSaveApi = this.handleSaveApi.bind(this)
    this.handleOpenGatewayPanel = this.handleOpenGatewayPanel.bind(this)
    this.handleCloseGatewayPanel = this.handleCloseGatewayPanel.bind(this)
    this.handleSaveGatewayRedirects = this.handleSaveGatewayRedirects.bind(this)
  }

  handleInputChange (event) {
    const target = event.target

    const value = target.type === 'checkbox' ? target.checked : target.value
    const settingsName = target.name
    if (target.type === 'checkbox') {
      console.log('input checkbox', value)
    }
    this.setState((state) => {
      const { settings, openApiPanel } = state
      settings[settingsName] = value
      return ({
        openApiPanel,
        settings
      })
    })
  }

  handleSelectChange (event) {
    this.setState((state) => {
      const { settings, openApiPanel } = state
      settings.microserviceType = event.target.value
      return ({
        openApiPanel,
        settings
      })
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSaveSettings(this.state.settings)
  }

  handleOpenApiPanel (event) {
    event.preventDefault()
    this.setState(st => {
      console.log('handleOpenApi', st)
      return { settings: st.settings, openApiPanel: true }
    })
  }

  handleBackApiPanel () {
    this.setState(st => {
      console.log('handleOpenApi', st)
      return { settings: st.settings, openApiPanel: false }
    })
  }

  handleOpenGatewayPanel () {
    this.setState({ openGatewayPanel: true })
  }

  handleCloseGatewayPanel () {
    this.setState({ openGatewayPanel: false })
  }

  componentDidMount () {
    console.log('mount', this.props.settings)
    const {
      id,
      name,
      port,
      microserviceType,
      type,
      api
    } = this.props.settings
    console.log('update settings', name, port,
      microserviceType, type, api)
    this.setState({
      openApiPanel: false,
      settings:
        {
          name: name === undefined ? '' : name,
          id,
          port:
            port === undefined ? '' : port,
          microserviceType:
            microserviceType === undefined ? 'default' : microserviceType,
          type,
          api: api === undefined ? [] : api
        }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('update')
    console.log('prevProps', prevProps, prevState)
    console.log('current props', this.props)
    if (prevState.settings.id !== '') {
      if (this.props.settings.id !== prevState.settings.id) {
        const {
          id,
          name,
          port,
          microserviceType,
          type,
          api
        } = this.props.settings
        console.log('update settings', name, port,
          microserviceType, type, api)
        this.setState({
          openApiPanel: false,
          settings:
            {
              name: name === undefined ? '' : name,
              id,
              port:
                port === undefined ? '' : port,
              microserviceType:
                microserviceType === undefined ? 'default' : microserviceType,
              type,
              api: api === undefined ? [] : api
            }
        })
      }
    }
  }

  handleSaveApi (api) {
    console.log('handleSaveApi', api, this.state)
    this.setState(st => (
        {
          openApiPanel: false,
          settings: {
            ...st.settings,
            api: api
          }
        }
      )
    )
  }

  handleSaveGatewayRedirects (redirects) {
    this.setState(st => ({
      openApiPanel: false,
      openGatewayPanel: false,
      settings: { ...st.settings, redirects }
    }))
  }

  render () {
    if (this.state.openApiPanel) {
      return <ApiPanel onBackApiPanel={this.handleBackApiPanel} onSaveApi={this.handleSaveApi}
                       apiData={this.state.settings.api}/>
    }

    if (this.state.openGatewayPanel) {
      return <GatewayPanel redirects={this.state.settings.redirects} onCloseGatewayPanel={this.handleCloseGatewayPanel}
                           onSaveGatewayRedirects={this.handleSaveGatewayRedirects}/>
    }

    let label = ''
    console.log('render microservice panel', this.state)
    if (this.state.name !== undefined) {
      label = this.state.name
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <div className="microservice-panel">
            <div className="row">
              <p className="object-type">Микросервис</p>
              <button
                className="btn-close"
                onClick={() => this.props.onCloseSettings()}
              />
            </div>
            <input
              name="name" className="object-name" type="text"
              placeholder={`Название ${label}`}
              value={this.state.settings.name} onChange={this.handleInputChange}
            />
            <input
              name="port" className="object-name" type="text" placeholder="Порт"
              value={this.state.settings.port} onChange={this.handleInputChange}
            />
            <div>
              <select
                className="microservice-type"
                value={this.state.settings.microserviceType}
                onChange={this.handleSelectChange}
              >
                <option value="gateway">
                  Перенаправляющий
                </option>
                <option value="default">
                  Обычный
                </option>
              </select>
            </div>
            {
              this.state.settings.microserviceType === 'gateway' ?
                null
                : <button
                  className="btn-api"
                  onClick={this.handleOpenApiPanel}
                >Настроить API
                </button>
            }
            {
              this.state.settings.microserviceType !== 'gateway'
                ? null
                : <button
                  className="btn-gateway" value="Настройки перенаправления" onClick={this.handleOpenGatewayPanel}
                >
                  Настройки перенаправления
                </button>
            }
            <input className="btn-save" type="submit" value="Сохранить"/>
          </div>
        </div>
      </form>
    )
  }
}
