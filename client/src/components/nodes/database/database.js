import React from 'react'

import { Handle } from 'react-flow-renderer'

const Database = ({ data, isConnectable }) => {
  const style = data.databaseType === 'nosql'
    ? { border: '1px solid #FD78A0', padding: 10, textAlign: 'center' }
    : null
  return (
    <div style={style} className='react-flow__node-output'>
      <Handle
        type='target'
        id='a_input'
        position='top'
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
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
