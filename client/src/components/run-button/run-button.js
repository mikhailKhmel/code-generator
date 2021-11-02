import React from 'react'
import './run-button.css'

const RunButton = (props) => {
  const handleRun = () => {
    const info = props.elementsInfo()
    console.log('run', info)
  }

  return (
    <button className='run-button' value='Run' onClick={handleRun}>Run</button>
  )
}

export default RunButton
