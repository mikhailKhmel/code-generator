import React, { Component } from 'react'

import './table-panel.css'
import AddTablePanel from '../add-table-panel'

export default class TablePanel extends Component {
  constructor (props) {
    super(props)
    this.state = { script: '', tables: [], addTablePanel: false }
    this.handleShowScript = this.handleShowScript.bind(this)
    this.handleAddTable = this.handleAddTable.bind(this)
    this.handleCloseAddTablePanel = this.handleCloseAddTablePanel.bind(this)
    this.handleCloseTablePanel = this.handleCloseTablePanel.bind(this)
  }

  handleShowScript () {

  }

  handleAddTable () {
    this.setState({ addTablePanel: true })
  }

  handleCloseAddTablePanel () {
    this.setState({ addTablePanel: false })
  }

  handleCloseTablePanel () {
    this.props.onCloseTablePanel()
  }

  render () {
    if (this.state.addTablePanel) {
      return <AddTablePanel onCloseAddTablePanel={this.handleCloseAddTablePanel} />
    }

    return (
      <div className='table-panel'>
        <button className='btn-back' onClick={this.handleCloseTablePanel}>
          Назад
        </button>
        <table>
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
                      <td>{x.name}</td>
                    </tr>
                  )
                })
              : null
          }
          </tbody>
        </table>
        <div className='btn-group'>
          <button className='btn-element' onClick={this.handleShowScript}>Итоговый скрипт</button>
          <button className='btn-element' onClick={this.handleAddTable}>Добавить таблицу</button>
          <button className='btn-element' onClick={this.handleSaveData}>Сохранить</button>
        </div>
      </div>

    )
  }
}
