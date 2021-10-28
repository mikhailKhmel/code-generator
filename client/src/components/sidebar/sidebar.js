import React from 'react';
import './sidebar.css';

const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="react-flow__node-input" onDragStart={(event) => onDragStart(event, 'microservice')} draggable>
                Микросервис
            </div>
            <div className="react-flow__node-default" onDragStart={(event) => onDragStart(event, 'queue')} draggable>
                Очередь
            </div>
            <div className="react-flow__node-output" onDragStart={(event) => onDragStart(event, 'database')} draggable>
                База данных
            </div>
        </aside>
    );
};

export default Sidebar;