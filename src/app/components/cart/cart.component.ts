import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  isLoading = false;

  updateQuantity(itemId: string, quantity: number) {
    this.cartService.updateQuantity(itemId, quantity);
  }

  remove(itemId: string) {
    this.cartService.remove(itemId);
  }

  async checkout() {
    this.isLoading = true;
    try {
      const items = this.cartService.items$();
      const lineItems = items.map((item) => ({
        title: item.product.title,
        embroidered: item.embroidered,
        quantity: item.quantity,
        unit_price: item.product.price,
        description: `${item.product.title} (${item.embroidered ? 'Embroidered' : 'Printed'})`
      }));

      // Call your backend
      const response = await fetch('https://snorf-zone-backend.onrender.com/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems })
      });

      const data = await response.json();

      if (data.sessionUrl) {
        // Redirect to Stripe hosted checkout
        window.location.href = data.sessionUrl;
      } else {
        this.checkoutMessage = data.error || 'Failed to initiate checkout.';
      }
    } catch (error: any) {
      console.error(error);
      this.checkoutMessage = 'Error initiating checkout. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}