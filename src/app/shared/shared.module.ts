import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiButtonComponent } from './ui/ui-button/ui-button.component';
import { UiTopbarComponent } from './ui/ui-topbar/ui-topbar.component';
import { UiSidebarComponent } from './ui/ui-sidebar/ui-sidebar.component';

import { PrimeModule } from './prime.module';
import { TableComponent } from './ui/table/table.component';

@NgModule({
  declarations: [
    UiButtonComponent,
    UiTopbarComponent,
    UiSidebarComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    UiButtonComponent,
    UiTopbarComponent,
    UiSidebarComponent,
    TableComponent,
  ],
})
export class SharedModule { }
