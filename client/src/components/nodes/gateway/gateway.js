import React from 'react'

import { Handle } from 'react-flow-renderer'

const Gateway = ({ data, isConnectable }) => {
  const style = { border: '1px solid #3be235', padding: 10, textAlign: 'center' }
  return (
    <div style={style} className="react-flow__node-default">
      <Handle
        type="target"
        id="a_input"
        position="top"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <div>
        {data.label}
        <hr/>
        {data.name}
      </div>
      <Handle
        type="source"
        position="bottom"
        id="a_output"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  )
}
export { Gateway }
