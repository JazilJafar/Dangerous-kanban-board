import KanbanStoreApi from '../kanbanapis/kanbanstoreapi.js';
import Item from '../items/item.js';
import Dropzone from '../items/dropzone.js';

export default class Column {
    constructor(id, title) {
        this.element = {};
        this.element.root = Column.createRoot();
        this.element.title = this.element.root.querySelector('.kanban__column-title');
        this.element.items = this.element.root.querySelector('.kanban__column-items');
        this.element.addItem = this.element.root.querySelector('.kanban__add-item');

        this.element.title.textContent = title;
        this.element.root.dataset.id = id;
        const topDropzone = Dropzone.createDropzone();
        this.element.items.appendChild(topDropzone);

        this.element.addItem.addEventListener('click', () => {
          const newItem = KanbanStoreApi.insertItem(id, '');
          this.renderItem(newItem);
        });

        KanbanStoreApi.getItems(id).forEach(item => {
            this.renderItem(item);
        });};
    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div><div class="kanban__column-items"></div>
                <button class="kanban__add-item" type="button">+ Add item</button>
            </div>
        `).children[0];
    }

    renderItem(data) {
        const item = new Item(data.id, data.content, data.dueDate)
        this.element.items.appendChild(item.element.root);
        this.element.items.appendChild(Dropzone.createDropzone());
    }
}