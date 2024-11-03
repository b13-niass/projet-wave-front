import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.css',
})
export class BurgerMenuComponent implements OnInit {
  @Input() init!: boolean;
  @Output() opened = new EventEmitter<boolean>();

  active = false;

  ngOnInit() {
    this.active = this.init || false;
  }

  onBurgerClicked() {
    this.active = !this.active;
    const isOpen = this.active;
    this.opened.emit(isOpen);
  }
}
