import { Component } from '@angular/core';
import { SidebarStateService } from '../../core/services/sidebar-state.service';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  isOpen = false;

  constructor(public sidebar: SidebarStateService) {}

  ngOnInit() {
    this.sidebar.open$.subscribe(state => {
      this.isOpen = state;
    });
  }

}
