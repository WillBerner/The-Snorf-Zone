import { computed, Injectable, signal } from '@angular/core';
import { Product, findProduct } from '../data/product-data';

export type CartOption = 'embroidered' | 'printed' | 'color-flaw';

interface StoredCartItem {
  productId: string;
  option: CartOption;
  quantity: number;
}

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

  constructor() {
    this.restoreCart();
  }

  add(product: Product, option: CartOption) {
    const id = createCartItemId(product, option);
    const existing = this.items().find((item) => item.id === id);

    if (existing) {
      this.items.update((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      this.saveCart();
      return;
    }

    this.items.update((items) => {
      const updated = [...items, { id, product, quantity: 1, option }];
      return updated;
    });
    this.saveCart();
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
    this.saveCart();
  }

  remove(itemId: string) {
    this.items.update((items) => items.filter((item) => item.id !== itemId));
    this.saveCart();
  }

  clear() {
    this.items.set([]);
    this.saveCart();
  }

  private saveCart() {
    const storedItems: StoredCartItem[] = this.items().map((item) => ({
      productId: item.product.id,
      option: item.option,
      quantity: item.quantity,
    }));

    window.localStorage.setItem('snorf-cart', JSON.stringify(storedItems));
  }

  private restoreCart() {
    try {
      const stored = window.localStorage.getItem('snorf-cart');
      if (!stored) {
        return;
      }

      const parsed: StoredCartItem[] = JSON.parse(stored);
      const restoredItems = parsed
        .map((item) => {
          const product = findProduct(item.productId);
          if (!product) {
            return null;
          }
          return {
            id: `${item.productId}:${item.option}`,
            product,
            quantity: item.quantity,
            option: item.option,
          } as CartItem;
        })
        .filter((item): item is CartItem => item !== null);

      if (restoredItems.length) {
        this.items.set(restoredItems);
      }
    } catch {
      // ignore invalid localStorage data
    }
  }
}
