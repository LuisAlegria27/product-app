import { Component, OnInit, Input } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping;
  @Input() cartCount: number = 0;
  @Input() cartProducts: any[] = [];
  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openCartModal(): void {
    this.showModal = true;
  }

  closeCartModal(): void {
    this.showModal = false;
  }
}
