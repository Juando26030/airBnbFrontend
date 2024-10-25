import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu-pay.component.html',
  styleUrl: './dropdown-menu-pay.component.css'
})
export class DropdownMenuPayComponent implements OnInit {
  isDropDownActive: boolean = false
  selectedOption: any

  constructor() { }

  ngOnInit(): void {
  }

  @Output() optionSelected = new EventEmitter<string>();

  selectOption(option: string | undefined) {
    this.selectedOption = option;
    this.optionSelected.emit(this.selectedOption || ''); // Emit empty string if no option selected
    this.isDropDownActive = false;
  }

}
