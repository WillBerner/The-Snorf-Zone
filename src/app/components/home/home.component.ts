import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../data/product-data';

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly products = PRODUCTS;
}
