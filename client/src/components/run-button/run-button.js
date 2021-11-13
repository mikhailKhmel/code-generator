import React from 'react'
import { withApi } from '../api/with-api'
import './run-button.css'

const RunButton = (props) => {
  const handleRun = async () => {
    const info = props.elementsInfo
    await withApi('/api/generator/run', 'POST', info)
  }

  return (
    <button className='run-button' value='Run' onClick={handleRun}>Run</button>
  )
}

export default RunButton
