import React, { Component } from 'react'
import AddColumnPanel from '../add-column-panel'
import './add-table-panel.css'

export default class AddTablePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      table: {
        name: '',
        columns: [],
        foreignKeys: []
      },
      openColumnPanel: false,
      databaseType: ''
    }

    this.handleBackTablePanel = this.handleBackTablePanel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOpenAddColumn = this.handleOpenAddColumn.bind(this)
  }

  componentDidMount () {
    console.log('mount add-table-panel. props:', this.props)
    let table
    if (this.props.table !== undefined) {
      table = {
        name: this.props.table.name,
        columns: this.props.table.columns,
        foreignKeys: this.props.table.foreignKeys
      }
    } else {
      table = {
        name: '',
        columns: [],
        foreignKeys: []
      }
    }
    this.setState({
      table: table,
      openColumnPanel: false,
      databaseType: this.props.databaseType
    })
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
    this.setState({ openColumnPanel: true })
  }

  render () {
    console.log('render add-table-panel. state:', this.state)

    if (this.state.openColumnPanel) {
      return <AddColumnPanel databaseType={this.state.databaseType} />
    }

    return (
      <div className='add-table-panel'>

        <button className='btn-back' onClick={this.handleBackTablePanel}>
          Назад
        </button>

        <input className='table-name' name='name' type='text' placeholder='Название таблицы' value={this.state.table.name} onChange={this.handleInputChange} />

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
