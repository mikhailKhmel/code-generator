import React, { Component } from 'react'
import ApiPanel from './api-panel/api-panel'

import './microservice-panel.css'

export default class MicroservicePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settings: {
        id: '',
        name: '',
        address: '',
        port: '',
        cache: false,
        microserviceType: 'default',
        type: 'microservice',
        api: []
      },
      openApiPanel: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenApiPanel = this.handleOpenApiPanel.bind(this)
    this.handleBackApiPanel = this.handleBackApiPanel.bind(this)
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

  componentDidMount () {
    console.log('mount', this.props.settings)
    this.setState({
      openApiPanel: false,
      settings: {
        ...this.props.settings
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
          address,
          port,
          cache,
          microserviceType,
          type,
          api
        } = this.props.settings
        console.log('update settings', name, address, port, cache,
          microserviceType, type, api)
        this.setState({
          openApiPanel: false,
          settings:
            {
              name: name === undefined ? '' : name,
              id,
              address:
                address === undefined ? '' : address,
              port:
                port === undefined ? '' : port,
              cache:
              cache,
              microserviceType:
                microserviceType === undefined ? 'default' : microserviceType,
              type,
              api
            }
        })
      }
    }
  }

  render () {
    if (this.state.openApiPanel) {
      return <ApiPanel onBackApiPanel={this.handleBackApiPanel} on />
    }

    let label = ''
    console.log('render', this.state)
    if (this.state.name !== undefined) {
      label = this.state.name
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='container-settings'>
          <div className='microservice-panel'>
            <div className='row'>
              <p className='object-type'>Микросервис</p>
              <button
                className='btn-close'
                onClick={() => this.props.onCloseSettings()}
              />
            </div>
            <input
              name='name' className='object-name' type='text'
              placeholder={`Название ${label}`}
              value={this.state.settings.name} onChange={this.handleInputChange}
            />
            <input
              name='address' className='object-name' type='text'
              placeholder='Адрес'
              value={this.state.settings.address}
              onChange={this.handleInputChange}
            />
            <input
              name='port' className='object-name' type='text' placeholder='Порт'
              value={this.state.settings.port} onChange={this.handleInputChange}
            />
            <div>
              <div className='cache'>
                <label>Кэш</label>
                <input
                  name='cache' type='checkbox' className='check-input'
                  checked={this.state.settings.cache}
                  onChange={this.handleInputChange}
                />
              </div>
              <select
                className='microservice-type'
                value={this.state.settings.microserviceType}
                onChange={this.handleSelectChange}
              >
                <option value='gateway'>
                  Перенаправляющий
                </option>
                <option value='default'>
                  Обычный
                </option>
                <option value='publisher'>
                  Поставщик
                </option>
                <option value='subscriber'>
                  Получатель
                </option>
              </select>
            </div>
            <button
              className='btn-api'
              onClick={this.handleOpenApiPanel}
            >Настроить API
            </button>
            <input className='btn-save' type='submit' value='Сохранить' />
          </div>
        </div>
      </form>
    )
  }
}
