import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  MatAutocompleteActivatedEvent,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  form!: FormGroup;
  options: string[] = [];
  mobile = true;
  cartItemsCount: string = '0';

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(),
    });

    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((breakpoint) => {
          if (
            breakpoint.breakpoints[Breakpoints.XSmall] ||
            breakpoint.breakpoints[Breakpoints.Small]
          )
            this.mobile = breakpoint.matches;
          else this.mobile = false;
        })
    );
  }

  onInput(event: Event) {
    this.options = [];
    if ((event.target as HTMLInputElement).value.trim().length > 0) {
      // products.slice(0, 10).forEach((product) => {
      //   this.options.push(product.name);
      // });
    }
  }

  onSubmit() {
    this.options = [];
    const value = this.form.get('search')?.value;
    this.onSearch(value);
  }

  onSearch(value: string, exact = false) {
    // if (value && value.length > 1) {
    //   this.router.navigate(['/search/' + value], {
    //     queryParams: { exact: exact },
    //   });
    // }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.onSearch(event.option.value, true);
  }

  onOptionActivated(event: MatAutocompleteActivatedEvent) {
    this.onSearch(event.option?.value, true);
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
