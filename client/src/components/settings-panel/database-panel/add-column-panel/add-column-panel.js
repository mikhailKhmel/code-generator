import React, { Component } from 'react'

import './add-column-panel.css'

export default class AddColumnPanel extends Component {
  constructor (props) {
    super(props)
    this.state = this.props.databaseType !== 'sql'
      ? {
          name: '',
          type: '',
          notnull: false,
          unique: false,
          index: '',
          defaultValue: ''
        }
      : {
          name: '',
          type: '',
          notnull: false,
          primaryKey: false,
          unique: false,
          defaultValue: ''
        }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentDidMount () {
    console.log('mount add-column-panel. props:', this.props)
    this.setState(this.props.databaseType !== 'sql'
      ? {
          name: '',
          type: '',
          notnull: false,
          unique: false,
          index: '',
          defaultValue: ''
        }
      : {
          name: '',
          type: '',
          notnull: false,
          primaryKey: false,
          unique: false,
          defaultValue: ''
        }
    )
  }

  handleInputChange (event) {
    const target = event.target

    const value = target.value
    const settingsName = target.name

    this.setState((state) => {
      const { table } = state
      table[settingsName] = value
      return ({
        table
      })
    })
  }

  handleSelectChange (event) {
    this.setState((state) => {
      state.type = event.target.value
      return state
    })
  }

  columnTypes (databaseType) {
    return databaseType === 'sql'
      ? (
        <select className='input-select' value={this.state.type}>
          <option value='integer'>Число</option>
          <option value='double'>Число с плавающей запятой</option>
          <option value='varchar'>Строка с ограничением</option>
          <option value='text'>Строка без ограничений</option>
          <option value='boolean'>Булево значение</option>
          <option value='datetime'>Дата и время</option>
        </select>
        )
      : (
        <select className='input-select' value={this.state.type}>
          <option value='integer'>Число</option>
          <option value='double'>Число с плавающей запятой</option>
          <option value='string'>Строка</option>
          <option value='boolean'>Булево значение</option>
          <option value='datetime'>Дата и время</option>
          <option value='array'>Массив</option>
          <option value='Object'>Объект</option>
          <option value='ObjectId'>ObjectId</option>
        </select>
        )
  }

  settingsTemplate () {
    // todo: доделать рендеринг настроек для разных типов бд
  }

  render () {
    console.log('render add-column-panel. state', this.state)
    return (
      <div className='add-column-panel'>
        <button className='btn-back' onClick={this.handleBackTablePanel}>
          Назад
        </button>
        <input
          className='input-name'
          name='name' type='text' placeholder='Название поля' value={this.state.name}
          onChange={this.handleInputChange}
        />
        {
          this.columnTypes(this.props.databaseType)
        }
      </div>
    )
  }
}
