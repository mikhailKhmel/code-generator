import React, { Component } from 'react'

import './add-table-panel.css'

export default class AddTablePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [],
      foreignKeys: []
    }

    this.handleBackTablePanel = this.handleBackTablePanel.bind(this)
  }

  componentDidMount () {
    this.setState({
      columns: this.props.columns
    })
  }

  handleBackTablePanel () {
    this.props.onCloseAddTablePanel()
  }

  render () {
    return (
      <div className='add-table-panel'>

        <button className='btn-back' onClick={this.handleBackTablePanel}>
          Назад
        </button>

        <input type='text' placeholder='Название таблицы' className='table-name' />

        <table>
          <thead>
            <tr>
              <td>Поля</td>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    )
  }
}
