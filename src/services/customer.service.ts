import { Injectable } from '@angular/core';

const STORAGE_KEY = 'tailor_customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers: any[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      this.customers = JSON.parse(data);
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.customers));
  }

  getCustomers() {
    return this.customers;
  }

  addCustomer(customer: any): number {
    customer.id = Date.now();
    customer.lastOrderDate = customer.orders?.length
      ? customer.orders[0].date
      : null;

    this.customers.push(customer);
    this.saveToStorage();

    return customer.id;
  }


  getCustomerById(id: number) {
    return this.customers.find(c => c.id === id);
  }

  addOrder(customerID: number, order: any) {
    const customer = this.getCustomerById(customerID);

    if (!customer) return;

    customer.orders.push(order);
    customer.lastOrderDate = order.date;

    this.saveToStorage();
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter(c => c.id !== id);
    this.saveToStorage();
  }

  markOrderCompleted(customerId: number, orderDate: Date) {
  const customer = this.getCustomerById(customerId);
  if (!customer) return;

  const order = customer.orders.find(
    (o: any) => new Date(o.date).getTime() === new Date(orderDate).getTime()
  );

  if (!order) return;

  order.status = 'completed';
  this.saveToStorage();
}

}
