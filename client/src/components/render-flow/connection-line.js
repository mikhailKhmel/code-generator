import React from 'react'
import { getBezierPath } from 'react-flow-renderer'

export default ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
}) => {
  const dAttr = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    connectionLineType,
    connectionLineStyle,
  })
  return (

    <g>
      <path
        fill="none"
        stroke="#426cc6"
        strokeWidth={1.5}
        className="animated"
        d={dAttr}
      />
      <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5}/>
    </g>
  )
};
