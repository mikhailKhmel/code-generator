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
          primary: false,
          unique: false,
          defaultValue: ''
        }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleBackAddColumnPanel = this.handleBackAddColumnPanel.bind(this)
    this.handleSaveColumn = this.handleSaveColumn.bind(this)
  }

  componentDidMount () {
    if (this.props.editColumn) {
      this.setState(this.props.editColumn)
      return
    }
    this.setState(this.props.databaseType !== 'sql'
      ? {
          name: '',
          type: 'integer',
          notnull: false,
          unique: false,
          index: '',
          defaultValue: ''
        }
      : {
          name: '',
          type: 'integer',
          notnull: false,
          primary: false,
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
      state[settingsName] = value
      return (state)
    })
  }

  handleCheckboxChange (event) {
    const target = event.target

    const value = target.checked
    const settingsName = target.name

    this.setState((state) => {
      state[settingsName] = value
      return (state)
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
        <select className='input-select' value={this.state.type} onChange={this.handleSelectChange}>
          <option value='integer'>Число</option>
          <option value='double'>Число с плавающей запятой</option>
          <option value='varchar(255)'>Строка с ограничением</option>
          <option value='text'>Строка без ограничений</option>
          <option value='boolean'>Булево значение</option>
          <option value='datetime'>Дата и время</option>
        </select>
        )
      : (
        <select className='input-select' value={this.state.type} onChange={this.handleSelectChange}>
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

  handleBackAddColumnPanel () {
    this.props.onCloseAddColumnPanel()
  }

  handleSaveColumn () {
    this.props.onSaveColumn(this.state)
  }

  render () {
    return (
      <div className='add-column-panel'>
        <button className='btn-back' onClick={this.handleBackAddColumnPanel}>
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
        <div>
          <div className='checkbox-settings'>
            <label for='notnull'>Непустое</label>
            <input name='notnull' type='checkbox' onChange={this.handleCheckboxChange} checked={this.state.notnull} />
          </div>
          <div className='checkbox-settings'>
            <label for='unique'>Уникальное</label>
            <input name='unique' type='checkbox' onChange={this.handleCheckboxChange} checked={this.state.unique} />
          </div>
          {
            this.props.databaseType === 'sql' &&
              <div className='checkbox-settings'>
                <label for='primary'>Первичный ключ</label>
                <input name='primary' type='checkbox' onChange={this.handleCheckboxChange} checked={this.state.primary} />
              </div>
          }
          <div>
            <input className='input-defaultvalue' type='text' placeholder='Значение по умолчанию' value={this.state.defaultValue} name='defaultValue' onChange={this.handleInputChange} />
          </div>
          <div className='btn-group'>
            <input className='btn-element' type='button' value='Сохранить' onClick={this.handleSaveColumn} />
          </div>
        </div>
      </div>
    )
  }
}
