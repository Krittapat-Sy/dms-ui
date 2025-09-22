import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private _open = new BehaviorSubject<boolean>(false);
  open$ = this._open.asObservable();

  toggle() {
    this._open.next(!this._open.value);
  }
}
