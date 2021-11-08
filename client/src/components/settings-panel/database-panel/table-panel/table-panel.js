import React, { Component } from 'react'

import './table-panel.css'
import AddTablePanel from '../add-table-panel'

export default class TablePanel extends Component {
  constructor (props) {
    super(props)
    this.state = { script: '', tables: [], databaseType: '', addTablePanel: false, editTable: '' }
    this.handleShowScript = this.handleShowScript.bind(this)
    this.handleAddTable = this.handleAddTable.bind(this)
    this.handleCloseAddTablePanel = this.handleCloseAddTablePanel.bind(this)
    this.handleCloseTablePanel = this.handleCloseTablePanel.bind(this)
    this.handleEditTable = this.handleEditTable.bind(this)
  }

  componentDidMount () {
    console.log('mount table-panel', this.props)
    this.setState({
      script: this.props.tablesData.script,
      tables: this.props.tablesData.tables,
      databaseType: this.props.tablesData.databaseType,
      addTablePanel: false
    })
  }

  handleShowScript () {

  }

  handleAddTable () {
    this.setState({ addTablePanel: true, editTable: '' })
  }

  handleEditTable (event) {
    this.setState({ addTablePanel: true, editTable: event.target.textContent })
  }

  handleCloseAddTablePanel () {
    this.setState({ addTablePanel: false })
  }

  handleCloseTablePanel () {
    this.props.onCloseTablePanel()
  }

  render () {
    console.log('render table-panel', this.state)
    if (this.state.addTablePanel) {
      return (
        <AddTablePanel
          onCloseAddTablePanel={this.handleCloseAddTablePanel}
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
                      <td className='table-row' onDoubleClick={this.handleEditTable}>{x.name}</td>
                    </tr>
                  )
                })
              : null
          }
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element' onClick={this.handleShowScript}>Итоговый скрипт</button>
          <button className='btn-element' onClick={this.handleAddTable}>
            Добавить {this.state.databaseType === 'sql' ? 'таблицу' : 'коллекцию'}
          </button>
          <button className='btn-element' onClick={this.handleSaveData}>Сохранить</button>
        </div>
      </div>

    )
  }
}
