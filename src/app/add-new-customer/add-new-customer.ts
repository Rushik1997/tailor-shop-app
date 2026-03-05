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
    blouseType: '',
    price: 0,
    blousePhoto: null as File | null,
    neckDesign: '',
    suggestions: ''
  };

  getTotal(): number {
    const qty = Number(this.order.qty) || 0;
    const price = Number(this.order.price) || 0;
    return qty * price;
  }

  setPrice() {
    if (this.order.blouseType === 'साधा') {
      this.order.price = 230;
    } else if (this.order.blouseType === 'कटोरी') {
      this.order.price = 300;
    } else if (this.order.blouseType === 'प्रिन्स कट') {
      this.order.price = 350;
    } else {
      this.order.price = 0;
    }
    this.calculateTotal();
  }

  calculateTotal(): number {
    const qty = Number(this.order.qty) || 0;
    const price = Number(this.order.price) || 0;
    return qty * price;
  }


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
  qty: this.order.qty,
  blouseType: this.order.blouseType,
  total: this.getTotal(),
  neckDesign: this.order.neckDesign,
  date: new Date(),
  status: 'pending'
});

    this.customerService.addCustomer(this.customer).subscribe({
      next: () => {
        // alert('Customer saved successfully');
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        console.error(err);
        alert('Error saving customer');
      }
    });
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

