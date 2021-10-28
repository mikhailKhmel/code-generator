import CustomNode from "../custom-node";


const generateNewNode = (elements) => {
    let nElement;
    if (elements.length === 0) {
        nElement = new CustomNode(1, { x: 100, y: 100 },
            { label: `New Element 1` }, 'default');
    } else {
        const lastElement = elements.find(x => x.id === elements.length).get();

        nElement = new CustomNode(
            lastElement.id + 1,
            {
                x: lastElement.position.x,
                y: lastElement.position.y + 100
            },
            { label: `New Element ${lastElement.id + 1}` },
            'default');
    }

    return nElement;
}

const getId = (l) => {
    return l + 1;
}

const getNodeTypeName = (type) => {
    switch (type) {
        case 'microservice':
            return 'Микросервис';
        case 'queue':
            return 'Очередь';
        case 'database':
            return 'База данных'
        default:
            return null;
    }
}

const getReactFlowTypeByCustomType = (type) => {
    switch (type) {
        case 'microservice':
            return 'input';
        case 'queue':
            return 'default';
        case 'database':
            return 'output';
        default:
            return null;
    }
}

export {
    generateNewNode,
    getId,
    getNodeTypeName,
    getReactFlowTypeByCustomType
};



