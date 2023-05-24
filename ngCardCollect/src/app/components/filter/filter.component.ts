import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  filters: Filters | null = null;
  @Output() changedVariable: EventEmitter<Filters | null> = new EventEmitter();

  constructor(private router: Router) {}

  searchForCards() {
    this.filters = new Filters();
  }

  setFilters(filters: Filters) {
    this.changedVariable.emit(filters);
    this.filters = null;
  }
}
