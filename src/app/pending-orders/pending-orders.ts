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
    this.customerService.getCustomers().subscribe((customers: any[]) => {

      this.pendingOrders = [];

      customers.forEach(customer => {
        customer.orders?.forEach((order: any) => {
          if (order.status === 'pending') {

            this.pendingOrders.push({
              customerID: customer._id,
              customerName: customer.name,
              whatsapp: customer.whatsapp,
              ...order
            });

          }
        });
      });

    });
  }

  markCompleted(order: any) {

    this.customerService
      .markOrderCompleted(order.customerID, order.date)
      .subscribe({
        next: () => {

          // remove order from pending list immediately
          this.pendingOrders = this.pendingOrders.filter(
            o => !(o.customerID === order.customerID && o.date === order.date)
          );

        },
        error: err => {
          console.error('Failed to mark completed', err);
        }
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
