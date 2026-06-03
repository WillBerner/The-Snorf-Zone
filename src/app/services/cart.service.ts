import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../data/product-data';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  embroidered: boolean;
}

function createCartItemId(product: Product, embroidered: boolean) {
  return `${product.id}:${embroidered ? 'embroidered' : 'printed'}`;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);
  readonly items$ = this.items.asReadonly();
  readonly totalItems = computed(() => this.items().reduce((count, item) => count + item.quantity, 0));
  readonly totalPrice = computed(() => this.items().reduce((total, item) => total + item.product.price * item.quantity, 0));

  add(product: Product, embroidered: boolean) {
    const id = createCartItemId(product, embroidered);
    const existing = this.items().find((item) => item.id === id);

    if (existing) {
      this.items.update((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      return;
    }

    this.items.update((items) => [...items, { id, product, quantity: 1, embroidered }]);
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(itemId);
      return;
    }

    this.items.update((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }

  remove(itemId: string) {
    this.items.update((items) => items.filter((item) => item.id !== itemId));
  }

  clear() {
    this.items.set([]);
  }
}
