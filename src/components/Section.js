class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderer= renderer;
        this._container = containerSelector;
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
