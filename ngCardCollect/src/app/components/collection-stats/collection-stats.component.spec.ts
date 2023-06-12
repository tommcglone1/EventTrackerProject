import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionStatsComponent } from './collection-stats.component';

describe('CollectionStatsComponent', () => {
  let component: CollectionStatsComponent;
  let fixture: ComponentFixture<CollectionStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
