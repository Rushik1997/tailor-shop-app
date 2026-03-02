import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AddNewCustomer } from './add-new-customer/add-new-customer';
import { Customers } from './customers/customers';
import { Designs } from './designs/designs';
import { PendingOrders } from './pending-orders/pending-orders';
import { CustomerDetails } from './customer-details/customer-details';
import { PlaceNewOrder } from './place-new-order/place-new-order';
import { Layout } from './layout/layout';

// export const routes: Routes = [
//     { path: '', component: Login },
//     { path: 'dashboard', component: Dashboard },
//     { path: 'addNewCustomer', component: AddNewCustomer },
//     { path: 'customers', component: Customers },
//     { path: 'designs', component: Designs },
//     { path: 'pendingOrders', component: PendingOrders },
//     { path: 'customers/:id', component: CustomerDetails },
//     { path: '', redirectTo: 'customers', pathMatch: 'full' },
//     { path: 'placeNewOrder', component: PlaceNewOrder },
//     { path: '', component: Layout, children:[
//         { path: 'dashboard', component: Dashboard },
//         { path: 'customers', component: Customers },
//         { path: 'addNewCustomer', component: AddNewCustomer },
//         { path: 'placeNewOrder', component: PlaceNewOrder },
//         { path: 'designs', component: Designs },
//         { path: 'pendingOrders', component: PendingOrders },
//     ]},
//     { path: '**', redirectTo: 'dashboard' }

// ];


export const routes: Routes = [
  { path: '', component: Login },

  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'customers', component: Customers },
      { path: 'customers/:id', component: CustomerDetails },
      { path: 'addNewCustomer', component: AddNewCustomer },
      { path: 'placeNewOrder', component: PlaceNewOrder },
      { path: 'designs', component: Designs },
      { path: 'pendingOrders', component: PendingOrders },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
