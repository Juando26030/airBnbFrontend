import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExplorarComponent } from './dashboard-explorar.component';

describe('DashboardExplorarComponent', () => {
  let component: DashboardExplorarComponent;
  let fixture: ComponentFixture<DashboardExplorarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardExplorarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardExplorarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
