import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoomsService } from '../rooms.service';
import { Room } from '../rooms.model';
import Papa from 'papaparse';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-room',
  standalone: false,
  templateUrl: './add-room.component.html',
})
export class AddRoomComponent {
  roomForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ms: MessageService,
    private sv: RoomsService,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit() {
    this.initRoomForm();
  }

  initRoomForm() {
    this.roomForm = this.fb.group({
      floor: [1],
      number: [1, [Validators.required, Validators.min(1)]],
      sizeSqM: [35.2],
      monthlyRent: [7700, Validators.required],
      deposit: [7700, Validators.required],
    });
  };


  addRoom() {
    let rooms: Room[] = [this.roomForm.value];
    this.sv.createRooms(rooms).subscribe({
      next: res => {
        this.ms.add({
          severity: 'success',
          summary: 'สำเร็จ',
          detail: 'เพิ่มห้องเรียบร้อยแล้ว',
          life: 3000
        });
        this.ref.close();
      },
      error: err => {
        if (err.status === 409) {
          this.ms.add({
            severity: 'warn',
            summary: 'ข้อมูลซ้ำ',
            detail: 'ห้องนี้มีอยู่แล้วในระบบ',
            life: 4000
          });
        } else {
          this.ms.add({
            severity: 'error',
            summary: 'ผิดพลาด',
            detail: 'เกิดข้อผิดพลาดในระบบ',
            life: 4000
          });
        }
      }
    });
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const rooms: Room[] = result.data.map((row: any) => ({
          floor: +row.floor,
          number: row.number,
          sizeSqM: +row.sizeSqM,
          monthlyRent: +row.monthlyRent,
          deposit: +row.deposit,
        }));

        this.sv.createRooms(rooms).subscribe({
          next: () => {
            this.ms.add({
              severity: 'success',
              summary: 'สำเร็จ',
              detail: 'นำเข้าห้องจาก CSV เรียบร้อยแล้ว',
              life: 3000
            });
          },
          error: (error) => {
            console.log(error);
            this.ms.add({
              severity: 'error',
              summary: 'ผิดพลาด',
              detail: 'นำเข้า CSV ไม่สำเร็จ',
              life: 4000
            });
          }
        });
      }
    });
  }

  onCancel(): void {
    this.ref.close();
  }

}
