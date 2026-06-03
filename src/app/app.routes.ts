import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlushiesComponent } from './components/plushies/plushies.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'plushies', component: PlushiesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: '**', component: NotFoundComponent }
];
