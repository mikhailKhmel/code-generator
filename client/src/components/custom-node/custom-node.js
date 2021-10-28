export default class CustomNode {
    constructor(id, position, data, type) {
        this.id = id;
        this.position = position;
        this.data = data;
        this.type = type
    }

    get() {
        return {id: this.id, position: this.position, data: this.data, type: this.type};
    }

}