import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Category } from '../../model/category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})

export class CategoriesListComponent {
  @Input() categories: Category[] = [];
  @Output() edit: EventEmitter<Category> = new EventEmitter(false);
  @Output() remove: EventEmitter<Category> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);

  readonly displayedColumns = ['name', 'icon', 'actions'];

  onAdd() {
    this.add.emit(true);
  }

  onEdit(record: Category) {
    this.edit.emit(record);
  }

  onRemove(record: Category) {
    this.remove.emit(record);
  }
}
