import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'cart-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  readonly items = this.cartService.items$;
  readonly totalItems = this.cartService.totalItems;
  readonly totalPrice = this.cartService.totalPrice;
  checkoutMessage = '';

  updateQuantity(itemId: string, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  remove(itemId: string) {
    this.cartService.remove(itemId);
  }

  async checkout() {
    try {
      const stripe = await loadStripe('pk_test_REPLACE_WITH_YOUR_PUBLIC_KEY');
      if (!stripe) {
        this.checkoutMessage = 'Unable to load Stripe.';
        return;
      }

      const items = this.cartService.items$();
      const lineItems = items.map((item) => ({
        title: item.product.title,
        embroidered: item.embroidered,
        quantity: item.quantity,
        unit_price: item.product.price,
        description: `${item.product.title} (${item.embroidered ? 'Embroidered' : 'Printed'})`
      }));

      console.log('Stripe checkout payload placeholder:', {
        lineItems,
        metadata: items.map((item) => ({
          productId: item.product.id,
          embroidered: item.embroidered
        }))
      });

      this.checkoutMessage = 'Stripe is loaded. Checkout payload has been logged to console. Replace this placeholder with a real server-side Stripe session creation flow.';
    } catch (error) {
      console.error(error);
      this.checkoutMessage = 'Checkout is not available at the moment.';
    }
  }
}
