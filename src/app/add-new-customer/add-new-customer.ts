import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new-customer',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-new-customer.html',
  styleUrl: './add-new-customer.css',
})
export class AddNewCustomer {

  editMode = true;

  customer = {
    name: '',
    whatsapp: '',
    address: '',
    measurements: {
      sleeve: '',
      shoulder: '',
      height: '',
      chest: '',
      neck: '',
      back: ''
    },
    orders: [] as any[]
  };
  order = {
    qty: 1,
    blousePhoto: null as File | null,
    cuttingPhoto: null as File | null,
    neckDesign: '',
    suggestions: ''
  };
  onBlousePhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.order.blousePhoto = input.files[0];
    }
  }

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  saveCustomer() {

    if (!this.isValidCustomer()) return;

    if (!this.isValidOrder()) return;

    this.customer.orders.push({
      ...this.order,
      date: new Date(),
      status: 'pending'
    });

    this.customerService.addCustomer(this.customer);
    this.router.navigate(['/customers']);
  }


  isValidCustomer(): boolean {
  if (!this.customer.name.trim()) {
    alert('Customer name is required');
    return false;
  }

  if (!/^\d{10}$/.test(this.customer.whatsapp)) {
    alert('Enter a valid 10-digit WhatsApp number');
    return false;
  }

  const m = this.customer.measurements;

  const hasValidMeasurement = Object.values(m).some(value => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  });

  if (!hasValidMeasurement) {
    alert('Enter at least one measurement greater than 0');
    return false;
  }

  return true;
}


  isValidOrder(): boolean {
    if (!this.order.qty || this.order.qty <= 0) {
      alert('Quantity must be greater than 0');
      return false;
    }
    return true;
  }


}

