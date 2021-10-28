export default class CustomEdge {
    constructor(id, source, target) {
        this.id = id;
        this.source = source;
        this.target = target;
    }

    get() {
        return {id: this.id, source: this.source, target: this.target, type: 'straight'};
    }

}