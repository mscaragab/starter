import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  login = false;

  @Output() sidenavClose = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onLogout() {
    this.onClose();
  }

  onClose() {
    this.sidenavClose.emit();
  }

  getFriendlyName(value: string) {
    return Utils.friendlyUrl(value);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
