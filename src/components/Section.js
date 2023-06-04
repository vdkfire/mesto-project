class Section {
    constructor({items, renderer}, container) {
        this._renderer= renderer;
        this._container = container;
    }

    rendererItems(items) {
        items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element){
        this._container.prepend(element);
    }
}

export default Section;
