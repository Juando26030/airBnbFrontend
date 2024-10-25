import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuPayComponent } from './dropdown-menu-pay.component';

describe('DropdownMenuPayComponent', () => {
  let component: DropdownMenuPayComponent;
  let fixture: ComponentFixture<DropdownMenuPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownMenuPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
