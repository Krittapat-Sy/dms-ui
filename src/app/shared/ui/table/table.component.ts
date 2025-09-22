import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableAction, TableColumn } from './table.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'ui-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() globalFilterFields: string[] = [];
  @Input() columns!: TableColumn[];
  @Input() data!: any[];

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  loading: boolean = true;

  searchValue: string = '';

  // columns = [
  //   { field: 'name', header: 'Name', sortable: true },
  //   { field: 'country.name', header: 'Country', sortable: true },
  //   { field: 'date', header: 'Date', sortable: true, type: 'date' },
  //   { field: 'balance', header: 'Balance', sortable: true, type: 'currency' },
  //   { field: 'status', header: 'Status', sortable: true, type: 'status' }
  // ];
  constructor() { }



  getSeverity(status: string) {
    switch (status) {
      case 'VACANT':
        return 'success';
      case 'MAINTENANCE':
        return 'warn';
      case 'OCCUPIED':
        return 'danger';
      default:
        return 'info';
    }
  }

  clear(table: any) {
    table.clear();
    this.searchValue = ''; // reset global search ด้วย
  }

  getValue(row: any, field: string): any {
    return field.split('.').reduce((acc, key) => acc?.[key], row);
  }

  onEdit(row: any) { this.edit.emit(row); }
  onDelete(row: any) { this.remove.emit(row); }


}


