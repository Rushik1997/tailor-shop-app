import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pending-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './pending-orders.html',
  styleUrl: './pending-orders.css',
})
export class PendingOrders {

  pendingOrders: any[] = [];
  constructor(private customerService: CustomerService) { }


  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (customers: any[]) => {
        this.pendingOrders = customers.flatMap((c: any) => (c.order || []).filter((o: any) => o.status === 'pending').map((o: any) => ({
          ...o, customerID: c._id, customerName: c.name
        })))
      },
      error: (err: any) => {
        console.error('Error loading pending orders:', err)
      }
    });
  }

  // markCompleted(order: any) {
  //   this.customerService.markOrderCompleted(order.customerId, order.date);
  //   this.ngOnInit(); // refresh list
  // }

  markCompleted(order: any) {
  console.log('Mark completed not implemented yet', order);
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
