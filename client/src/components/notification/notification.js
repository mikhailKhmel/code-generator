import React, { Component } from 'react'
import './notification.css'

export default class Notification extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      ok: false
    }

    this.handleCloseNotification = this.handleCloseNotification.bind(this)
  }

  componentDidMount () {
    const { title, description, ok } = this.props
    this.setState({ title, description, ok })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.title !== prevProps.title || this.props.description !== prevProps.description) {
      const { title, description, ok } = this.props
      this.setState({ title, description, ok })
    }
  }

  handleCloseNotification () {
    this.props.onCloseNotification()
  }

  render () {
    console.log('render Notification. state ', this.state)
    let styleNotification = 'notification'

    styleNotification += !this.state.ok ? ' error' : ' success'
    return (
      <div className={styleNotification}>
        <div className="notification-row">
          <button className="notification-close" onClick={this.handleCloseNotification}>
            X
          </button>
          <div className="notification-title">
            {this.state.title}
          </div>
        </div>
        {this.state.description
          ? <div className="notification-row">
            <div className="notification-description">
              {this.state.description}
            </div>
          </div>
          : null}

      </div>
    )
  }
}
