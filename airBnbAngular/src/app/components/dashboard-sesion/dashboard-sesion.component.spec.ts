import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSesionComponent } from './dashboard-sesion.component';

describe('DashboardSesionComponent', () => {
  let component: DashboardSesionComponent;
  let fixture: ComponentFixture<DashboardSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
