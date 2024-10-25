import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaReservaComponent } from './ventana-reserva.component';

describe('VentanaReservaComponent', () => {
  let component: VentanaReservaComponent;
  let fixture: ComponentFixture<VentanaReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
