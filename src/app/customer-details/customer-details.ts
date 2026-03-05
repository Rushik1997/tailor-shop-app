import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-details.html',
  styleUrls: ['./customer-details.css']
})
export class CustomerDetails implements OnInit {
  editMode = false;
  showOrderForm = false;
  customer: any = null;

  order = {
    qty: 1,
    blouseType: '',
    price: 0,
    blousePhoto: null as File | null,
    neckDesign: '',
    suggestions: ''
  };

  constructor(private route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('Error loading customer:', err)
      }
    });

    const action = this.route.snapshot.queryParamMap.get('action');
    if (action === 'new-order') {
      this.showOrderForm = true;
    }

  }

  enableEdit() {
    this.editMode = true;
  }

  saveCustomer() {

  this.customerService
    .updateCustomer(this.customer._id, this.customer)
    .subscribe({
      next: (updatedCustomer) => {
        this.customer = updatedCustomer;
        this.editMode = false;
      },
      error: (err) => {
        console.error('Failed to update customer', err);
      }
    });

}

  saveOrder() {

    if (!this.isValidOrder()) return;

    const newOrder = {
      qty: this.order.qty,
      blouseType: this.order.blouseType,
      total: this.getTotal(),
      neckDesign: this.order.neckDesign,
      date: new Date(),
      status: 'pending'
    };

    // add order to customer
    if (!this.customer.orders) {
      this.customer.orders = [];
    }

    this.customer.orders.push(newOrder);

    // update customer in DB
    this.customerService
      .updateCustomer(this.customer._id, this.customer)
      .subscribe({
        next: (updatedCustomer) => {

          this.customer = updatedCustomer;

          // reset form
          this.order = {
            qty: 1,
            blouseType: '',
            price: 0,
            blousePhoto: null,
            neckDesign: '',
            suggestions: ''
          };

        },
        error: (err) => {
          console.error("Failed to save order", err);
        }
      });

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

  getTotal(): number {
    const qty = Number(this.order.qty) || 0;
    const price = Number(this.order.price) || 0;
    return qty * price;
  }


  isValidOrder(): boolean {
    const qty = Number(this.order.qty);
    if (!this.order.qty || this.order.qty <= 0) {
      alert('Quantity must be greater than 0');
      return false;
    }
    return true;
  }

  onBlousePhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.order.blousePhoto = input.files[0];
    }
  }

  markCompleted(order: any) {

    this.customerService
      .markOrderCompleted(this.customer._id, order.date)
      .subscribe({
        next: () => {

          // update UI immediately
          order.status = 'completed';

          // refresh customer from backend
          this.customerService
            .getCustomerById(this.customer._id)
            .subscribe(data => {
              this.customer = data;
            });

        },
        error: err => {
          console.error("Failed to mark completed", err);
        }
      });

  }

  get sortedOrders() {
    if (!this.customer?.orders) return [];

    return [...this.customer.orders].sort((a: any, b: any) => {
      // 1️⃣ Pending first
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1;
      }

      // 2️⃣ Newest date first
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  toggleImages(order: any) {
    order.showImages = !order.showImages;
  }

  previewImage: string | null = null;

  openImage(src: string) {
    this.previewImage = src;
  }

  closeImage() {
    this.previewImage = null;
  }

}


