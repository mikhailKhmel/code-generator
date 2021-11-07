import React, { Component } from 'react'

import './database-panel.css'

export default class DatabasePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settings: {
        id: '',
        name: '',
        address: '',
        port: '',
        username: '',
        password: '',
        databaseType: 'sql'
      },
      openTablePanel: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    console.log('mount', this.props.settings)
    this.setState({
      openTablePanel: false,
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
          databaseType,
          type
        } = this.props.settings
        console.log('update settings', name, address, port, cache,
          databaseType, type)
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
              databaseType:
                databaseType === undefined ? 'sql' : databaseType,
              type
            }
        })
      }
    }
  }

  handleInputChange (event) {
    const target = event.target

    const value = target.value
    const settingsName = target.name

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
      settings.databaseType = event.target.value
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

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='container-settings'>
          <div className='database-panel'>
            <div className='row'>
              <p className='object-type'>База данных</p>
              <button
                className='btn-close'
                onClick={() => this.props.onCloseSettings()}
              />
            </div>
            <input
              name='name' className='object-name' type='text'
              placeholder='Название'
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
            <input
              name='username' className='object-name' type='text'
              placeholder='Имя пользователя'
              value={this.state.settings.username}
              onChange={this.handleInputChange}
            />
            <input
              name='password' className='object-name' type='text'
              placeholder='Пароль'
              value={this.state.settings.password}
              onChange={this.handleInputChange}
            />
            <div>
              <select
                className='database-type'
                value={this.state.settings.databaseType}
                onChange={this.handleSelectChange}
              >
                <option value='sql'>
                  SQL
                </option>
                <option value='nosql'>
                  NoSQL
                </option>
              </select>
            </div>
            <button
              className='btn-api'
              onClick={this.handleOpenApiPanel}
            >Описание {this.state.settings.databaseType === 'sql' ? 'таблиц' : 'коллекций'}
            </button>
            <input className='btn-save' type='submit' value='Сохранить' />
          </div>
        </div>
      </form>
    )
  }
}
