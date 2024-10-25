import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropiedadComponent } from './view-propiedad.component';

describe('ViewPropiedadComponent', () => {
  let component: ViewPropiedadComponent;
  let fixture: ComponentFixture<ViewPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
