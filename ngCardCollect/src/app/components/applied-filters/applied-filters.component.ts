import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-applied-filters',
  templateUrl: './applied-filters.component.html',
  styleUrls: ['./applied-filters.component.css'],
})
export class AppliedFiltersComponent {
  @Input() filters: Filters | null = null;
  @Output() changedVariable: EventEmitter<Filters | null> = new EventEmitter();

  removeFilter(filterKey: string) {
    if (this.filters) {
      this.filters[filterKey] = null;
    }

    this.changedVariable.emit(this.filters);
  }
}
