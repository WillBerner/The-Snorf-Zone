import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../data/product-data';

export type CartOption = 'embroidered' | 'printed' | 'color-flaw';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  option: CartOption;
}

function createCartItemId(product: Product, option: CartOption) {
  return `${product.id}:${option}`;
}

function getCartItemUnitPrice(item: CartItem) {
  if (item.option === 'embroidered') {
    return item.product.price;
  }
  if (item.option === 'printed') {
    return Math.max(item.product.price - 10, 0);
  }
  return Math.max(item.product.price - 20, 0);
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);
  readonly items$ = this.items.asReadonly();
  readonly totalItems = computed(() => this.items().reduce((count, item) => count + item.quantity, 0));
  readonly totalPrice = computed(() =>
    this.items().reduce((total, item) => total + getCartItemUnitPrice(item) * item.quantity, 0)
  );

  add(product: Product, option: CartOption) {
    const id = createCartItemId(product, option);
    const existing = this.items().find((item) => item.id === id);

    if (existing) {
      this.items.update((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      return;
    }

    this.items.update((items) => [...items, { id, product, quantity: 1, option }]);
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
