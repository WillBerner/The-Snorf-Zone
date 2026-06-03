import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../data/product-data';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);
  readonly items$ = this.items.asReadonly();
  readonly totalItems = computed(() => this.items().reduce((count, item) => count + item.quantity, 0));
  readonly totalPrice = computed(() => this.items().reduce((total, item) => total + item.product.price * item.quantity, 0));

  add(product: Product) {
    const existing = this.items().find((item) => item.product.id === product.id);
    if (existing) {
      this.items.update((items) =>
        items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      return;
    }

    this.items.update((items) => [...items, { product, quantity: 1 }]);
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }

    this.items.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  remove(productId: string) {
    this.items.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clear() {
    this.items.set([]);
  }
}
