import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartService } from '../../services/cart.service';
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
  private readonly cartService = inject(CartService);

  readonly product = findProduct(this.route.snapshot.paramMap.get('id') ?? '');
  readonly embroidered = signal(true);

  readonly detailsText = computed(() => {
    const details = this.product?.details ?? '';
    const noteIndex = details.indexOf('NOTE:');
    return noteIndex === -1 ? details.trim() : details.slice(0, noteIndex).trim();
  });

  readonly noteText = computed(() => {
    const details = this.product?.details ?? '';
    const noteIndex = details.indexOf('NOTE:');
    return noteIndex === -1 ? '' : details.slice(noteIndex).trim();
  });

  readonly contactNote = 'If you have any questions or concerns, please email me at evethelesbianfrog@gmail.com!';

  setEmbroidered(value: boolean) {
    this.embroidered.set(value);
  }

  addToCart() {
    if (this.product) {
      this.cartService.add(this.product, this.embroidered());
    }
  }
}
