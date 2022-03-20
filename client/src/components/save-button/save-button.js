import React from 'react'
import './save-button.css'

const SaveButton = (props) => {
  return (
    <div>
      <button className="save-button" value="Run" onClick={props.onSave}>Сохранить модель</button>
    </div>

  )
}

export default SaveButton
