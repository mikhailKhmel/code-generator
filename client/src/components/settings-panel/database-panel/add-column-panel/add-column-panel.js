import React, { Component } from 'react'

import './add-column-panel.css'

export default class AddColumnPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    this.setState({
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

  columnTypes () {
    return (
      <select className="input-select" value={this.state.type} onChange={this.handleSelectChange}>
        <option value="uuid">UUID</option>
        <option value="integer">Число</option>
        <option value="double">Число с плавающей запятой</option>
        <option value="varchar(255)">Строка с ограничением</option>
        <option value="text">Строка без ограничений</option>
        <option value="boolean">Булево значение</option>
        <option value="timestamp">Дата и время</option>
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
      <div className="add-column-panel">
        <button className="btn-back" onClick={this.handleBackAddColumnPanel}>
          Назад
        </button>
        <input
          className="input-name"
          name="name" type="text" placeholder="Название поля" value={this.state.name}
          onChange={this.handleInputChange}
        />
        {
          this.columnTypes()
        }
        <div>
          <div className="checkbox-settings">
            <label>Непустое</label>
            <input name="notnull" type="checkbox" onChange={this.handleCheckboxChange}
                   checked={this.state.notnull}/>
          </div>
          <div className="checkbox-settings">
            <label>Уникальное</label>
            <input name="unique" type="checkbox" onChange={this.handleCheckboxChange}
                   checked={this.state.unique}/>
          </div>
          <div className="checkbox-settings">
            <label>Первичный ключ</label>
            <input name="primary" type="checkbox" onChange={this.handleCheckboxChange}
                   checked={this.state.primary}/>
          </div>
          <div>
            <input className="input-defaultvalue" type="text" placeholder="Значение по умолчанию"
                   value={this.state.defaultValue} name="defaultValue" onChange={this.handleInputChange}/>
          </div>
          <div className="btn-group">
            <input className="btn-element" type="button" value="Сохранить" onClick={this.handleSaveColumn}/>
          </div>
        </div>
      </div>
    )
  }
}
