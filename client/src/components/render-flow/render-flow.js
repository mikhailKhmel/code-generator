import React, { useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Background, MiniMap } from 'react-flow-renderer';
import SettingsPanel from '../settings-panel/settings-panel';
import Sidebar from "../sidebar";
import { getId, getNodeTypeName, getReactFlowTypeByCustomType } from "../utils";

import './render-flow.css';

const RenderFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [elements, setElements] = useState([]);
    const [settingsOn, setSettingOn] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();
        if (reactFlowInstance) {
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(elements.length).toString(),
                type: getReactFlowTypeByCustomType(type),
                position,
                data: { label: getNodeTypeName(type) },
            };
            setElements((es) => es.concat(newNode));
        }
    };

    const onNodeDoubleClick = (_, node) => {
        console.log('open', node.data.label);
        setSettingOn(node.data.label);
    }

    const onCloseSettings = () => {
        console.log('close');
        setSettingOn(null);
    } 

    return (
        <div className="render-flow">
            <ReactFlowProvider>
                <Sidebar />
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements}
                        className="flow"
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeDoubleClick={onNodeDoubleClick}
                    >
                        <Controls />
                        <Background
                            variant='dots'
                            gap={24}
                            size={0.6}
                            color='blue'
                        />
                        <MiniMap
                            nodeStrokeColor={(n) => {
                                if (n.style?.background) return n.style.background;
                                if (n.type === 'input') return '#0041d0';
                                if (n.type === 'output') return '#ff0072';
                                if (n.type === 'default') return '#1a192b';

                                return '#eee';
                            }}
                            nodeColor={(n) => {
                                if (n.style?.background) return n.style.background;

                                return '#fff';
                            }}
                            nodeBorderRadius={2}
                        />
                    </ReactFlow>
                </div>
                {settingsOn === null ? null : <SettingsPanel objectType={settingsOn} onCloseSettings={onCloseSettings} /> }
            </ReactFlowProvider>
        </div>

    );
};

export default RenderFlow;