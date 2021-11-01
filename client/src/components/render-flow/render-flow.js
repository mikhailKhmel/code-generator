import React, { useRef, useState } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider,
    removeElements
} from 'react-flow-renderer';
import Microservice from '../nodes';
import SettingsPanel from '../settings-panel/settings-panel';
import Sidebar from "../sidebar";
import { getId, getNodeTypeName } from "../utils";

import './render-flow.css';

const nodeTypes = {
    microservice: Microservice
};

const RenderFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [elements, setElements] = useState([]);
    const [settings, setSettings] = useState(null);
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
                type: type,
                position,
                data: {label: getNodeTypeName(type), microserviceType: 'default'},
            };
            setElements((es) => es.concat({node: newNode, settings: {id: newNode.id}}));
        }
    };

    const onNodeDoubleClick = (_, node) => {
        const currentSettings = elements.find(x => x.node.id === node.id);
        console.log('open', currentSettings);
        setSettings(currentSettings !== undefined ? currentSettings.settings : {});
    }

    const onCloseSettings = () => {
        console.log('close');
        setSettings(null);
    }

    const onSaveSettings = (settings) => {
        const el = elements.find(el => el.node.id === settings.id);
        el.node.data.microserviceType = settings.microserviceType;
        el.node.data.name = settings.name;
        el.settings = settings;
        console.log('save', el);
        const elIndex = elements.findIndex(el => el.node.id === settings.id);
        setElements((es) => [
            ...es.slice(0, elIndex),
            el,
            ...es.slice(elIndex + 1)
        ]);
    }
    console.log('elements', elements);
    return (
        <div className="render-flow">
            <ReactFlowProvider>
                <Sidebar/>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        elements={elements.map(x => x.node)}
                        className="flow"
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeDoubleClick={onNodeDoubleClick}
                        nodeTypes={nodeTypes}
                    >
                        <Controls/>
                        <Background
                            variant='dots'
                            gap={20}
                            size={0.6}
                            color='gray'
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
                {settings === null ? null :
                    <SettingsPanel node={settings} onCloseSettings={onCloseSettings} onSaveSettings={onSaveSettings}/>}
            </ReactFlowProvider>
        </div>

    );
};

export default RenderFlow;