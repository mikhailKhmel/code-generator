import React from 'react'

import { Handle } from 'react-flow-renderer'

const Client = ({ data, isConnectable }) => {
    return (
        <div className='react-flow__node-input'>
            <div>
                {data.label}
                <hr />
                {data.name}
            </div>
            <Handle
                type='source'
                position='bottom'
                id='a_output'
                style={{ background: '#555' }}
                isConnectable={isConnectable}
            />
        </div>
    )
}
export { Client }
