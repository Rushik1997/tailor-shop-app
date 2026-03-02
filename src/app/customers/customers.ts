import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {

  searchText = '';
  customers: any[] = [];

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  get filteredCustomers() {
    const text = this.searchText.toLowerCase();

    return this.customers.filter(c =>
      c.name.toLowerCase().includes(text) ||
      c.whatsapp?.includes(text) ||
      c.address?.toLowerCase().includes(text)
    );
  }

  addCustomer() {
    this.router.navigate(['/addNewCustomer']);
  }

  openCustomer(id: number) {
    this.router.navigate(['/customers', id]);
  }

  deleteCustomer(id:number){
    const confirmDelete = confirm("Are you sure you want to delete this customer?");
    if(!confirmDelete) {
      return;
    }
  
    this.customerService.deleteCustomer(id);
    this.customers = this.customerService.getCustomers();
  }

}
