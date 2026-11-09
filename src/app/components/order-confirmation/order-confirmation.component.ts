import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface CheckoutSession {
  id: string;
  status: string | null;
  payment_status: string;
  customer_email: string | null;
  amount_total: number | null;
  currency: string | null;
  line_items: Array<{
    description: string | null;
    quantity: number | null;
    amount_total: number | null;
    currency: string | null;
  }>;
}

@Component({
  standalone: true,
  selector: 'order-confirmation-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class OrderConfirmationComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly backendUrl = 'https://snorf-zone-backend.onrender.com';

  session: CheckoutSession | null = null;
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');
    if (!sessionId) {
      this.errorMessage = 'We could not find the checkout session for this order.';
      this.isLoading = false;
      return;
    }

    void this.loadSession(sessionId);
  }

  get isPaid(): boolean {
    return this.session?.payment_status === 'paid';
  }

  formatTotal(): string {
    if (this.session?.amount_total == null || !this.session.currency) {
      return '';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.session.currency.toUpperCase(),
    }).format(this.session.amount_total / 100);
  }

  private async loadSession(sessionId: string): Promise<void> {
    try {
      const response = await fetch(
        `${this.backendUrl}/api/session/${encodeURIComponent(sessionId)}`,
      );
      if (!response.ok) {
        throw new Error(`Could not retrieve checkout session (${response.status}).`);
      }

      this.session = (await response.json()) as CheckoutSession;
      if (this.isPaid) {
        this.cartService.clear();
      }
    } catch (error: unknown) {
      console.error('Unable to load checkout confirmation:', error);
      this.errorMessage = 'We could not load your order details. Please contact us if your payment was completed.';
    } finally {
      this.isLoading = false;
    }
  }
}
