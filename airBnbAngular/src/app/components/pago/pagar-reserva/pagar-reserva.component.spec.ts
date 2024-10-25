import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PagarReservaComponent} from "./pagar-reserva.component";


describe('PayReservationComponent', () => {
  let component: PagarReservaComponent;
  let fixture: ComponentFixture<PagarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarReservaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
