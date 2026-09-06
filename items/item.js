import Dropzone from '../items/dropzone.js';
import KanbanStoreApi from '../kanbanapis/kanbanstoreapi.js';

export default class Item {
    constructor(id, content, dueDate) {
        const bottomDropzone = Dropzone.createDropzone();
        this.element = {};
        this.element.root = Item.createRoot();
        this.element.input = this.element.root.querySelector('.kanban__item-input');
        this.element.deleteBtn = this.element.root.querySelector('.kanban__item-delete');
        this.element.dueDate = this.element.root.querySelector('.kanban__item-due');
        this.element.root.dataset.id = id;
        this.element.input.textContent = content;
        if(dueDate) {
            this.element.dueDate.value = dueDate;
        }
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
        this.element.dueDate.addEventListener('change', () => {
    KanbanStoreApi.updateItem(id, { dueDate: this.element.dueDate.value });
});
        let confirmTimeout = null;
        this.element.deleteBtn.addEventListener('click', e => {
        e.stopPropagation();

    if (!this.element.deleteBtn.classList.contains('kanban__item-delete--confirming')) {
        this.element.deleteBtn.classList.add('kanban__item-delete--confirming');
        this.element.deleteBtn.textContent = '✓';
        this.element.deleteBtn.setAttribute('title', 'Click again to confirm delete');

        confirmTimeout = setTimeout(() => {
            this.element.deleteBtn.classList.remove('kanban__item-delete--confirming');
            this.element.deleteBtn.textContent = '×';
            this.element.deleteBtn.setAttribute('title', 'Delete item');
        }, 3000);
        
        return;
    }
    
    clearTimeout(confirmTimeout);
    KanbanStoreApi.deleteItem(id);
    this.element.input.removeEventListener('blur', onBlur);
    this.element.root.parentElement.removeChild(this.element.root);

    location.reload();
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
            <button class="kanban__item-delete" type="button" title="Delete item">×</button>
            <div class="kanban__item-input" contenteditable></div>
            <input class="kanban__item-due" type="date" title="Due date">
            </div>
        `).children[0];
    }
}