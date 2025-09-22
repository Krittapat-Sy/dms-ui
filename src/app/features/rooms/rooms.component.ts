import { Component, ViewChild } from '@angular/core';
import { RoomsService } from './rooms.service';
import { TableColumn } from '../../shared/ui/table/table.model';
import { Room, RoomSummary } from './rooms.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddRoomComponent } from './add-room/add-room.component';
import { AppDialogService } from '../../core/services/dialog.service';
import { EditRoomComponent } from './edit-room/edit-room.component';

@Component({
  selector: 'app-rooms',
  standalone: false,
  templateUrl: './rooms.component.html',
})
export class RoomsComponent {
  roomsData: Room[] = [];
  roomSummary: RoomSummary | null = null;
  columns: TableColumn[] = [
    { field: "floor", header: "ชั้น" },
    { field: "number", header: "หมายเลขห้อง" },
    { field: "sizeSqM", header: "ขนาด/ตารางเมตร" },
    { field: "status", header: "สถานะ", type: 'status' },
    { field: "monthlyRent", header: "ค่าเช่า/เดือน" },
  ]
  filterFields: string[] = ["number"]
  activeStatusFilter: string = 'ALL';

  constructor(
    private sv: RoomsService,
    private ms: MessageService,
    private cfs: ConfirmationService,
    private modal: AppDialogService,
  ) { }

  ngOnInit() {
    this.sv.getRooms(this.activeStatusFilter).subscribe((data: any) => {
      this.roomsData = data.rooms;
      this.roomSummary = data.summary;
    });
  }

  addRoom() {
    const ref = this.modal.open(AddRoomComponent, {
      header: 'เพิ่มห้องพัก',
      size: 'sm',
    });

    ref.onClose.subscribe((res) => {
      this.reroadFromServer();
    });
  }

  editRoom(row: Room) {
    const ref = this.modal.open(EditRoomComponent, {
      header: 'แก้ไข',
      size: 'sm',
      data: { row }
    });

    ref.onClose.subscribe((res) => {
      this.reroadFromServer();
    });
  }

  onRemove(row: any) {
    this.cfs.confirm({
      message: `ลบห้อง ${row.number} ออกจากระบบ?`,
      header: 'ยืนยันการลบ',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-text p-button-secondary',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.sv.deleteRoom(row.id).subscribe({
          next: (res) => {
            this.reroadFromServer();
            this.ms.add({ severity: 'success', summary: 'สำเร็จ', detail: 'ลบห้องเรียบร้อย' });
          },
          error: () => this.ms.add({ severity: 'error', summary: 'ผิดพลาด', detail: 'ลบห้องไม่สำเร็จ' }),
        });
      }
    });
  }


  filterByStatus(status: string) {
    this.activeStatusFilter = status;
    this.reroadFromServer();
  }

  reroadFromServer() {
    this.sv.getRooms(this.activeStatusFilter).subscribe((data: any) => {
      this.roomsData = data.rooms;
      this.roomSummary = data.summary;
    });
  }
}
