import React, { useRef, useState } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  removeElements
} from 'react-flow-renderer'
import { Database, Microservice } from '../nodes'
import RunButton from '../run-button'
import SettingsPanel from '../settings-panel'
import Sidebar from '../sidebar'
import { getId, getNodeTypeName } from '../utils'

import './render-flow.css'

const nodeTypes = {
  microservice: Microservice,
  database: Database
}

const RenderFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [elements, setElements] = useState([])
  const [settings, setSettings] = useState([])
  const [openSettings, setOpenSettings] = useState(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const onConnect = (params) => setElements(
    (els) => addEdge({ ...params }, els))

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance)

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els))

  const onDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const onDrop = (event) => {
    event.preventDefault()
    if (reactFlowInstance) {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData('application/reactflow')
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      })
      const newNode = {
        id: getId(elements.length).toString(),
        type: type,
        position,
        data: { label: getNodeTypeName(type) }
      }
      if (type === 'microservice') {
        newNode.data.microserviceType = 'default'
      }
      setElements((es) => es.concat(newNode))
      setSettings(st => st.concat({ id: newNode.id, name: '', type: type }))
    }
  }

  const onNodeDoubleClick = (_, node) => {
    const currentSettings = settings.find(x => x.id === node.id)
    setOpenSettings(currentSettings)
  }

  const onCloseSettings = () => {
    setOpenSettings(null)
  }

  const onSaveSettings = (newSettings) => {
    const el = elements.find(el => el.id === newSettings.id)
    let st = settings.find(st => st.id === newSettings.id)

    if (el.type === 'microservice') {
      el.data.microserviceType = newSettings.microserviceType
    }

    el.data.name = newSettings.name
    st = { ...newSettings }
    const elIndex = elements.findIndex(el => el.id === newSettings.id)
    const currentElements = [
      ...elements.slice(0, elIndex),
      el,
      ...elements.slice(elIndex + 1)
    ]
    // определяем какие связи надо удалить
    // сейчас удаляются только если целевой элемент - перенаправляющий микросервис
    const elementsToRemove = []
    for (let i = 0; i < currentElements.length; i++) {
      if (currentElements[i].id.includes('edge')) {
        const targetNode = currentElements.find(
          y => y.id === currentElements[i].target)
        if (targetNode.data.microserviceType === 'gateway') {
          elementsToRemove.push(currentElements[i])
        }
      }
    }
    onElementsRemove(elementsToRemove)

    const stIndex = settings.findIndex(st => st.id === newSettings.id)
    setSettings((sts) => [
      ...sts.slice(0, stIndex),
      st,
      ...sts.slice(stIndex + 1)
    ])
  }

  const getAllElementsInfo = () => {
    return { elements, settings }
  }

  console.log('elements', elements)
  console.log('settings', settings)
  return (
    <div className='render-flow'>
      <ReactFlowProvider>
        <Sidebar />
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            className='flow'
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
          >
            <Controls />
            <Background
              variant='dots'
              gap={20}
              size={0.6}
              color='gray'
            />
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.style?.background) return n.style.background
                if (n.data.microserviceType === 'gateway') return '#0041d0'
                if (n.type === 'microservice') return '#1a192b'
                if (n.type === 'database') return '#db16b0'

                return '#eee'
              }}
              nodeColor={(n) => {
                if (n.style?.background) return n.style.background

                return '#fff'
              }}
              nodeBorderRadius={2}
            />
          </ReactFlow>
        </div>
        {openSettings === null
          ? null
          : <SettingsPanel
              settings={openSettings} onCloseSettings={onCloseSettings}
              onSaveSettings={onSaveSettings}
            />}
        <RunButton elementsInfo={getAllElementsInfo()}/>
      </ReactFlowProvider>
    </div>

  )
}

export default RenderFlow
