import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutsModule } from './layouts/layouts.module';
import { RoomsComponent } from './features/rooms/rooms.component';
import { AddRoomComponent } from './features/rooms/add-room/add-room.component';
import { EditRoomComponent } from './features/rooms/edit-room/edit-room.component';
import { LoginComponent } from './features/login/login.component';
import { AuthService } from './core/services/auth.service';

export function initApp(auth: AuthService) {
  return () => auth.refreshToken().toPromise().catch(() => null);
}
@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    AddRoomComponent,
    EditRoomComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LayoutsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none',
        },
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
