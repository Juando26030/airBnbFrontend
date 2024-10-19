import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent implements OnInit {
  isDropDownActive: boolean = false
  selectedOption: any

  constructor() { }

  ngOnInit(): void {
  }

}
