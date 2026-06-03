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

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  remove(productId: string) {
    this.cartService.remove(productId);
  }

  async checkout() {
    try {
      const stripe = await loadStripe('pk_test_REPLACE_WITH_YOUR_PUBLIC_KEY');
      if (!stripe) {
        this.checkoutMessage = 'Unable to load Stripe.';
        return;
      }
      this.checkoutMessage = 'Stripe is loaded. Add real checkout next.';
    } catch (error) {
      console.error(error);
      this.checkoutMessage = 'Checkout is not available at the moment.';
    }
  }
}
