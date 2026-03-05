
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-place-new-order',
  imports: [ CommonModule, FormsModule],
  templateUrl: './place-new-order.html',
  styleUrl: './place-new-order.css',
})
export class PlaceNewOrder implements OnInit {
  searchText = '';
  customers: any[] = [];


  constructor(
    private customerService: CustomerService,
    private router: Router

  ) { }

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  get filteredCustomers() {
    const text = this.searchText.toLowerCase();
    return this.customers.filter(c =>
      c.name.toLowerCase().includes(text) ||
      c.whatsapp.includes(text)
    );
  }

  selectCustomer(customer: any) {
    this.router.navigate(['/customers', customer.id], {
      queryParams: { action: 'new-order' }
    });
  }

  addNewCustomer() {
    this.router.navigate(['/addNewCustomer'], {
      queryParams: { redirect: 'new-order' }
    });

  }
  placeNewOrder() {
    this.router.navigate(['/addNewCustomer'], {
      queryParams: { redirect: 'place-order' }
    });

  }
}

