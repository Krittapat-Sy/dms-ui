import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  exports: [
    ButtonModule,
    PanelMenuModule,
    MenubarModule,
    DrawerModule,
    DividerModule,
    AvatarModule,
    BadgeModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    MenuModule,
    RippleModule,
    TooltipModule,
    TableModule,
    TagModule,
    RatingModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SliderModule,
    DropdownModule,
    ProgressBarModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TabsModule,
    InputNumberModule
  ],
  providers: [MessageService, ConfirmationService, DialogService],

})
export class PrimeModule { }
