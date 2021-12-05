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
      editColumn: {},
      databaseType: ''
    }

    this.handleBackTablePanel = this.handleBackTablePanel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOpenCloseAddColumn = this.handleOpenCloseAddColumn.bind(this)
    this.handleSaveColumn = this.handleSaveColumn.bind(this)
    this.handleSaveTable = this.handleSaveTable.bind(this)
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

  handleOpenCloseAddColumn (value, editColumn) {
    this.setState({ openColumnPanel: value, editColumn: this.state.table.columns.find(x => x.name === editColumn) })
  }

  handleSaveColumn (column) {
    const colIndx = this.state.table.columns.findIndex(x => x.name === column.name)
    let columns = this.state.table.columns
    if (colIndx < 0) {
      columns = [...columns, column]
    } else {
      columns = [...columns.slice(0, colIndx), column, ...columns.slice(colIndx + 1)]
    }
    this.setState(st => ({
      ...st,
      openColumnPanel: false,
      table: {
        ...st.table,
        columns
      }
    }))
  }

  handleSaveTable () {
    console.log(this.props)
    this.props.onSaveTable(this.state.table)
  }

  render () {
    console.log('render add-table-panel. state:', this.state)

    if (this.state.openColumnPanel) {
      return (
        <AddColumnPanel
          databaseType={this.state.databaseType}
          onCloseAddColumnPanel={() => this.handleOpenCloseAddColumn(false)}
          onSaveColumn={this.handleSaveColumn}
          editColumn={this.state.editColumn}
        />
      )
    }

    return (
      <div className='add-table-panel'>

        <button className='btn-back' onClick={this.handleBackTablePanel}>
          Назад
        </button>

        <input className='table-name' name='name' type='text' placeholder='Название таблицы' value={this.state.table.name} onChange={this.handleInputChange} />

        <table className='addtablepanel-table'>
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
                      <td className='column-row' onClick={() => this.handleOpenCloseAddColumn(true, x.name)}>{x.name}</td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element'>Внешние ключи</button>
          <button className='btn-element' onClick={() => this.handleOpenCloseAddColumn(true)}>Добавить поле</button>
          <button className='btn-element' onClick={this.handleSaveTable}>Сохранить</button>
          <button className='btn-element' onClick={() => this.props.onRemoveTable(this.state.table.name)}>Удалить таблицу</button>
        </div>
      </div>
    )
  }
}
