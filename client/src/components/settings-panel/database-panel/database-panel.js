import React, { Component } from 'react'

import './database-panel.css'
import TablePanel from './table-panel'

export default class DatabasePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      settings: {
        id: '',
        name: '',
        port: '',
        username: '',
        password: '',
        tables: [],
        script: ''
      },
      openTablePanel: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenTablePanel = this.handleOpenTablePanel.bind(this)
    this.handleCloseTablePanel = this.handleCloseTablePanel.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
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
        this.setState({
          openTablePanel: false,
          settings: {
            ...this.props.settings
          }
        })
      }
    }
  }

  handleOpenTablePanel () {
    this.setState(st => {
      console.log('handleOpenTablePanel', st)
      return { settings: st.settings, openTablePanel: true }
    })
  }

  handleCloseTablePanel () {
    console.log('close table panel')
    this.setState(st => ({ openTablePanel: false, settings: st.settings }))
  }

  handleInputChange (event) {
    const target = event.target

    const value = target.value
    const settingsName = target.name

    this.setState((state) => {
      const { settings, openTablePanel } = state
      settings[settingsName] = value
      return ({
        openTablePanel,
        settings
      })
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSaveSettings(this.state.settings)
  }

  handleSaveData ({script, tables}) {
    this.setState(st => ({settings: {...st.settings, script, tables}, openTablePanel: false}))
  }

  render () {
    console.log('render database-panel', this.state)
    if (this.state.openTablePanel) {
      return (
        <TablePanel
          onCloseTablePanel={this.handleCloseTablePanel} tablesData={{
            tables: this.state.settings.tables || [],
            script: this.state.settings.script || ''
          }}
          onSaveData={this.handleSaveData}
        />
      )
    }

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
              placeholder='Название базы данных'
              value={this.state.settings.name} onChange={this.handleInputChange}
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
              name='password' className='object-name' type='password'
              placeholder='Пароль'
              value={this.state.settings.password}
              onChange={this.handleInputChange}
            />
            <button
              className='btn-api'
              onClick={this.handleOpenTablePanel}
            >Описание таблиц
            </button>
            <input className='btn-save' type='submit' value='Сохранить' />
          </div>
        </div>
      </form>
    )
  }
}
