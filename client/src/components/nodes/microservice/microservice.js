import React from 'react'

import { Handle } from 'react-flow-renderer'

const Microservice = ({data, isConnectable}) => {
    const style = data.microserviceType === 'gateway' ?
        {border: '1px solid blue', padding: 10, textAlign: 'center'}
        : {border: '1px solid #777', padding: 10, textAlign: 'center'}
    return (
        <div style={style}>
            {data.microserviceType !== 'gateway' &&
            <Handle
                type="target"
                id="a_input"
                position="top"
                style={{background: '#555'}}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            }
            <div>
                {data.label}
                <hr/>
                {data.name}
            </div>
            <Handle
                type="source"
                position="bottom"
                id="a_output"
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
        </div>
    )
}
export default Microservice