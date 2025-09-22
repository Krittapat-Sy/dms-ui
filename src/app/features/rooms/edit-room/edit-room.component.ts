import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomsService } from '../rooms.service';
import { switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Room } from '../rooms.model';

@Component({
  selector: 'app-edit-room',
  standalone: false,
  templateUrl: './edit-room.component.html',
})
export class EditRoomComponent {
  editRoomForm!: FormGroup;
  room: any;
  statusOptions = [
    { label: 'VACANT', value: 'VACANT' },
    { label: 'OCCUPIED', value: 'OCCUPIED' },
    { label: 'MAINTENANCE', value: 'MAINTENANCE' }
  ];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private sv: RoomsService,
    private ms: MessageService,
  ) {
    this.room = this.config.data.row;
  }

  ngOnInit() {
    this.editRoomFormInint();
  }

  editRoomFormInint() {
    this.editRoomForm = this.fb.group({
      id: [this.room.id, Validators.required],
      number: [this.room.number, Validators.required],
      floor: [this.room.floor],
      sizeSqM: [this.room.sizeSqM],
      monthlyRent: [this.room.monthlyRent, Validators.required],
      deposit: [this.room.deposit, Validators.required],
    });
  };

  onSave() {
    let roomData = this.editRoomForm.value;
    if (this.editRoomForm.valid) {
      this.sv.updateRoom(roomData).subscribe({
        next: (data) => {
          this.ms.add({ severity: 'success', summary: 'สำเร็จ', detail: 'แก้ไขข้อมูลห้องเรียบร้อยแล้ว' });
          this.ref.close(data);
        },
        error: () => this.ms.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'แก้ไขข้อมูลห้องไม่สำเร็จ' }),
      });
    }
  }

  onCancel(): void {
    this.ref.close();
  }
}
