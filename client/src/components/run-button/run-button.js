import React from 'react'
import { sendRequestApi } from '../api/api'
import './run-button.css'

const RunButton = (props) => {
  const handleRun = async (event) => {
    event.preventDefault()
    const info = props.elementsInfo
    await sendRequestApi('/api/generator/run', 'POST', info)
  }

  return (
    <button className='run-button' value='Run' onClick={handleRun}>Run</button>
  )
}

export default RunButton
