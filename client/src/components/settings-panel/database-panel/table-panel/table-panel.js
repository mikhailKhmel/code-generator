import React, { Component } from 'react'
import { generateSqlScript } from '../../../utils'

import './table-panel.css'
import AddTablePanel from '../add-table-panel'

export default class TablePanel extends Component {
  constructor (props) {
    super(props)
    this.state = { script: '', tables: [], databaseType: '', addTablePanel: false, editTable: '', editScript: false }
    this.handleShowScript = this.handleShowScript.bind(this)
    this.handleAddTable = this.handleAddTable.bind(this)
    this.handleCloseAddTablePanel = this.handleCloseAddTablePanel.bind(this)
    this.handleCloseTablePanel = this.handleCloseTablePanel.bind(this)
    this.handleEditTable = this.handleEditTable.bind(this)
    this.handleSaveTable = this.handleSaveTable.bind(this)
    this.handleChangeScript = this.handleChangeScript.bind(this)
    this.handleSaveData = this.handleSaveData.bind(this)
    this.handleRemoveTable = this.handleRemoveTable.bind(this)
  }

  componentDidMount () {
    console.log('mount table-panel', this.props)
    this.setState({
      script: this.props.tablesData.script,
      tables: this.props.tablesData.tables,
      databaseType: this.props.tablesData.databaseType,
      addTablePanel: false,
      editTable: '',
      editScript: false
    })
  }

  handleShowScript () {
    this.setState(st => ({ ...st, editScript: !st.editScript }))
  }

  handleAddTable () {
    this.setState({ addTablePanel: true, editTable: '' })
  }

  handleEditTable (event) {
    this.setState({ addTablePanel: true, editTable: event.target.textContent })
  }

  handleCloseAddTablePanel () {
    this.setState({ addTablePanel: false, editTable: '' })
  }

  handleCloseTablePanel () {
    this.props.onCloseTablePanel()
  }

  handleSaveTable (table) {
    const tableIndx = this.state.tables.findIndex(x => x.name === table.name)
    let tables = this.state.tables
    if (tableIndx < 0) {
      tables = [...tables, table]
    } else {
      tables = [...tables.slice(0, tableIndx), table, ...tables.slice(tableIndx + 1)]
    }
    this.setState(st => ({
      ...st,
      addTablePanel: false,
      tables,
      script: generateSqlScript(tables)
    }))
  }

  handleChangeScript (event) {
    this.setState({ script: event.target.value })
  }

  handleSaveData () {
    this.props.onSaveData({ script: this.state.script, tables: this.state.tables })
  }

  handleRemoveTable (name) {
    console.log(name)
    this.setState(st => ({
      ...st,
      addTablePanel: false,
      tables: st.tables.filter(x => x.name !== name),
      script: generateSqlScript(st.tables.filter(x => x.name !== name))
    }))
  }

  render () {
    console.log('render table-panel', this.state)
    if (this.state.addTablePanel) {
      return (
        <AddTablePanel
          onCloseAddTablePanel={this.handleCloseAddTablePanel}
          onSaveTable={this.handleSaveTable}
          onRemoveTable={this.handleRemoveTable}
          table={this.state.tables.find(x => x.name === this.state.editTable)}
          databaseType={this.state.databaseType}
        />
      )
    }

    return (
      <div className='table-panel'>
        <button className='btn-back' onClick={this.handleCloseTablePanel}>
          Назад
        </button>
        <table className='tables'>
          <thead>
            <tr>
              <td>Список таблиц</td>
            </tr>
          </thead>
          <tbody>
            {
            this.state.tables !== undefined
              ? this.state.tables.map(x => {
                  return (
                    <tr key={`${x.name}`}>
                      <td className='table-row' onClick={this.handleEditTable}>{x.name}</td>
                    </tr>
                  )
                })
              : null
          }
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element' onClick={this.handleShowScript}>Итоговый
            скрипт
          </button>
          <button className='btn-element' onClick={this.handleAddTable}>
            Добавить {this.state.databaseType === 'sql' ? 'таблицу' : 'коллекцию'}
          </button>
          <button className='btn-element' onClick={this.handleSaveData}>Сохранить
          </button>
        </div>
        {
          this.state.editScript
            ? <div>
              <textarea
                className='textarea' defaultValue={this.state.script}
                onChange={this.handleChangeScript}
              />
            </div>
            : null
        }
      </div>

    )
  }
}
