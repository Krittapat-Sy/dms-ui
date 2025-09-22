import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

export type DialogSize = 'sm' | 'md' | 'lg';

@Injectable({ providedIn: 'root' })
export class AppDialogService {
  constructor(private dialogService: DialogService) { }

  open(component: any, options: { header?: string; size?: DialogSize; data?: any } = {}): DynamicDialogRef {
    const width = this.getWidth(options.size);

    return this.dialogService.open(component, {
      header: options.header ?? 'ข้อมูล',
      width,
      closable: true,
      modal: true,
      dismissableMask: false,
      data: options.data ?? null,
    });
  }

  private getWidth(size: DialogSize = 'md'): string {
    switch (size) {
      case 'sm': return '30vw';
      case 'lg': return '80vw';
      default: return '50vw';
    }
  }
}
