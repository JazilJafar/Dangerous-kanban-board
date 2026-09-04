import Dropzone from '../items/dropzone.js';
import KanbanStoreApi from '../kanbanapis/kanbanstoreapi.js';

export default class Item {
    constructor(id, content) {
        const bottomDropzone = Dropzone.createDropzone();
        this.element = {};
        this.element.root = Item.createRoot();
        this.element.input = this.element.root.querySelector('.kanban__item-input');
    
        this.element.root.dataset.id = id;
        this.element.input.textContent = content;

        this.content = content;
        this.element.root.appendChild(bottomDropzone);
        const onBlur = () => {
            const newContent = this.element.input.textContent.trim();

            if (newContent === this.content){
                return;
            }
            this.content = newContent;
            KanbanStoreApi.updateItem(id, { content: this.content});
            console.log(newContent);
            console.log(this.content);
        };
        this.element.input.addEventListener('blur', onBlur);
        this.element.root.addEventListener('contextmenu', e => {
            e.preventDefault();
            const check = confirm('Are you sure you want to delete this item?');
            if (check) {
                KanbanStoreApi.deleteItem(id);
                this.element.input.removeEventListener('blur', onBlur);
                this.element.root.parentElement.removeChild(this.element.root);
                
                location.reload();
            }
        });

        this.element.root.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', id);
        });
        this.element.root.addEventListener('drop', e => {
            e.preventDefault();
        });
    }
    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable></div>
            </div>
        `).children[0];
    }
}