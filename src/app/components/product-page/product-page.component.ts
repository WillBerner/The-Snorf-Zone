import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartService, CartOption } from '../../services/cart.service';
import { findProduct } from '../../data/product-data';

@Component({
  standalone: true,
  selector: 'product-page',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);

  readonly product = findProduct(this.route.snapshot.paramMap.get('id') ?? '');
  readonly selectedOption = signal<CartOption>('embroidered');
  readonly showColorFlaw = computed(() => this.product?.id === 'bubble-boy');
  readonly selectedPrice = computed(() => {
    if (!this.product) {
      return 0;
    }
    const option = this.selectedOption();
    return option === 'embroidered'
      ? this.product.price
      : option === 'printed'
      ? Math.max(this.product.price - 10, 0)
      : Math.max(this.product.price - 20, 0);
  });

  readonly detailsText = computed(() => {
    const details = this.product?.details ?? '';
    const noteIndex = details.indexOf('NOTE:');
    const shippingIndex = details.indexOf('Please allow');

    if (shippingIndex === -1) {
      return noteIndex === -1 ? details.trim() : details.slice(0, noteIndex).trim();
    }

    return details.slice(0, shippingIndex).trim();
  });

  readonly shippingText = computed(() => {
    const details = this.product?.details ?? '';
    const noteIndex = details.indexOf('NOTE:');
    const shippingIndex = details.indexOf('Please allow');

    if (shippingIndex === -1) {
      return '';
    }

    return (noteIndex === -1 ? details.slice(shippingIndex) : details.slice(shippingIndex, noteIndex)).trim();
  });

  readonly noteText = computed(() => {
    const details = this.product?.details ?? '';
    const noteIndex = details.indexOf('NOTE:');
    return noteIndex === -1 ? '' : details.slice(noteIndex).trim();
  });
  
  setOption(option: CartOption) {
    this.selectedOption.set(option);
  }

  addToCart() {
    if (this.product) {
      this.cartService.add(this.product, this.selectedOption());
      this.router.navigate(['/cart']);
    }
  }
}
