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
  constructor(private customerService: CustomerService) {}


ngOnInit() {
  const customers = this.customerService.getCustomers();

  this.pendingOrders = customers.flatMap(c =>
    c.orders
      .filter((o: any) => o.status === 'pending')
      .map((o: any) => ({
          customerId: c.id,
        customerName: c.name,
        whatsapp: c.whatsapp,
        ...o
      }))
  );
}

markCompleted(order: any) {
  this.customerService.markOrderCompleted(order.customerId, order.date);
  this.ngOnInit(); // refresh list
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
