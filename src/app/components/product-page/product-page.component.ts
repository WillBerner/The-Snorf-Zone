import { Component, inject } from '@angular/core';
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

  addToCart() {
    if (this.product) {
      this.cartService.add(this.product);
    }
  }
}
