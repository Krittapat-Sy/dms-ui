import { Component, Input } from '@angular/core';

type Severity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help'
  | 'danger' | 'contrast';

@Component({
  selector: 'app-ui-button',
  standalone: false,
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent {
  @Input() label = '';
  @Input() icon?: string; // เช่น 'pi pi-plus'
  @Input() severity: Severity = 'primary';
  @Input() rounded = false;
  @Input() outlined = false;
  @Input() text = false;
  @Input() size: 'small' |  'large' | undefined ;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() loading = false;
}
