import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  stats = [
    { label: 'Tenants', value: 12, icon: 'pi pi-users' },
    { label: 'Invoices', value: 48, icon: 'pi pi-file' },
    { label: 'Balance', value: '$3,240', icon: 'pi pi-wallet' },
  ];
}
