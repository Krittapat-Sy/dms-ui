import { Component } from '@angular/core';
import { SidebarStateService } from '../../../core/services/sidebar-state.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-ui-sidebar',
  standalone: false,
  templateUrl: './ui-sidebar.component.html',
  styleUrls: ['./ui-sidebar.component.scss']
})
export class UiSidebarComponent {
  isOpen = false;
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-chart-line', route: '/dashboard' },
    { label: 'Billing', icon: 'pi pi-file', route: '/billing' },
    { label: 'Leases', icon: 'pi pi-file-edit', route: '/leases' },
    { label: 'Payments', icon: 'pi pi-credit-card', route: '/payments' },
    { label: 'Rooms', icon: 'pi pi-home', route: '/rooms' },
    { label: 'Tenants', icon: 'pi pi-users', route: '/tenants' },
    { label: 'Support Tickets', icon: 'pi pi-ticket', route: '/support-tickets' },
  ];

  constructor(public sidebar: SidebarStateService) { }

  ngOnInit() {
    this.sidebar.open$.subscribe(state => {
      this.isOpen = state;
    });
  }

}
