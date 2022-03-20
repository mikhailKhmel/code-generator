import React from 'react'
import './loading.css'

const Loading = () => {
  return (
    <svg className="spinner" width="25px" height="25px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"/>
    </svg>
  )
}

export { Loading }