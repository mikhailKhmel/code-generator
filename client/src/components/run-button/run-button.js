import React, { useState } from 'react'
import { sendRequestApi } from '../api/api'
import './run-button.css'
import { Loading } from './loading/loading'

const RunButton = (props) => {
  const [inProcess, setInProcess] = useState(false)
  const handleRun = async (event) => {
    event.preventDefault()
    setInProcess(true)
    const info = props.elementsInfo
    const res = await sendRequestApi('/api/generator/run', 'POST', info)
    console.log(res)
    props.onHandleError(res)
    setInProcess(false)
  }

  return (
    <div>
      {inProcess === true ? <Loading/> : null}
      <button className="run-button" value="Run" onClick={handleRun}>Генерация проекта</button>
    </div>

  )
}

export default RunButton
