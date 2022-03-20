import React from 'react'

import { Handle } from 'react-flow-renderer'

const Database = ({ data, isConnectable }) => {
  return (
    <div className='react-flow__node-output'>
      <Handle
        type='target'
        id='a_input'
        position='top'
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div>
        {data.label}
        <hr />
        {data.name}
      </div>
    </div>
  )
}
export { Database }
