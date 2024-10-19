import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationWindowComponent } from './reservation-window.component';

describe('ReservationWindowComponent', () => {
  let component: ReservationWindowComponent;
  let fixture: ComponentFixture<ReservationWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
