import { Component } from '@angular/core';
import { SidebarStateService } from '../../../core/services/sidebar-state.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-ui-topbar',
  standalone: false,
  templateUrl: './ui-topbar.component.html',
  styleUrls: ['./ui-topbar.component.scss']
})
export class UiTopbarComponent {
  isOpen = false;

  userMenu = [
    { label: 'แก้ไขข้อมูลส่วนตัว', icon: 'pi pi-user-edit', command: () => this.editProfile() },
    { label: 'ออกจากระบบ', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(private sidebar: SidebarStateService, private auth: AuthService) { }

  ngOnInit() {
    this.sidebar.open$.subscribe(state => {
      this.isOpen = state;
    });
  }

  toggleSidebar() {
    this.sidebar.toggle();
  }

  editProfile() {
    console.log('Edit profile clicked');
  }



  logout() {
    this.auth.logout();
  }
}
