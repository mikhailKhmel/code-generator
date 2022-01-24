import React from 'react'
import { sendRequestApi } from '../api/api'
import './run-button.css'

const RunButton = (props) => {
  const handleRun = async (event) => {
    event.preventDefault()
    const info = props.elementsInfo
    const res = await sendRequestApi('/api/generator/run', 'POST', info)
    console.log(res)
    props.onHandleError(res)
  }

  return (
    <button className='run-button' value='Run' onClick={handleRun}>Генерация проекта</button>
  )
}

export default RunButton
