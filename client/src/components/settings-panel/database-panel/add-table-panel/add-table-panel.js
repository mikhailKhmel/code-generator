import React, { Component } from 'react'

import './add-table-panel.css'
import AddColumnPanel from '../add-column-panel'

export default class AddTablePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      table: {
        name: '',
        columns: [],
        foreignKeys: []
      },
      openColumnPanel: false
    }

    this.handleBackTablePanel = this.handleBackTablePanel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOpenAddColumn = this.handleOpenAddColumn.bind(this)
  }

  componentDidMount () {
    console.log('add table panel mount', this.props)
    if (this.props.table !== undefined) {
      this.setState({
        table: {
          name: this.props.table.name,
          columns: this.props.table.columns,
          foreignKeys: this.props.table.foreignKeys
        },
        openColumnPanel: false
      })
    }
  }

  handleBackTablePanel () {
    this.props.onCloseAddTablePanel()
  }

  handleInputChange (event) {
    const target = event.target

    const value = target.value
    const settingsName = target.name

    this.setState((state) => {
      const { table, openColumnPanel } = state
      table[settingsName] = value
      return ({
        openColumnPanel,
        table
      })
    })
  }

  handleOpenAddColumn () {
    // todo: не работает открытие панели новой колонки
    this.setState({ openColumnPanel: true })
  }

  render () {
    if (this.state.openColumnPanel) {
      return <AddColumnPanel />
    }

    return (
      <div className='add-table-panel'>

        <button className='btn-back' onClick={this.handleBackTablePanel}>
          Назад
        </button>

        <input name='name' type='text' placeholder='Название таблицы' className='table-name' value={this.state.table.name} onChange={this.handleInputChange} />

        <table>
          <thead>
            <tr>
              <td>Поля</td>
            </tr>
          </thead>
          <tbody>
            {this.state.table.columns !== undefined
              ? this.state.table.columns.map(x => {
                  return (
                    <tr key={`${x.name}`}>
                      <td className='column-row'>{x.name}</td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element'>Внешние ключи</button>
          <button className='btn-element' onClick={this.handleOpenAddColumn}>Добавить</button>
          <button className='btn-element'>Сохранить</button>
        </div>
      </div>
    )
  }
}
