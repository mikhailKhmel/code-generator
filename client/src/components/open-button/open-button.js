import React from 'react'
import './open-button.css'
import styled from 'styled-components'

const Button = styled.button`
  position: absolute;
  right: 10px;
  bottom: 250px;
  border-radius: 5px;
  border: 1px solid #4b6077;
  background-color: #94bbe6;
  color: #4b6077;
  width: 165px;

  &:hover {
    background-color: #4b6077;
    color: #94bbe6;
    cursor: pointer;
  }
`

const OpenButton = (props) => {
  const hiddenFileInput = React.useRef(null)

  const handleClick = () => {
    hiddenFileInput.current.click()
  }
  const handleChange = event => {
    const fileUploaded = event.target.files[0]
    props.onOpen(fileUploaded)
  }
  return (
    <>
      <Button onClick={handleClick}>
        Открыть модель
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{ display: 'none' }}
      />
    </>
  )
}

export default OpenButton
