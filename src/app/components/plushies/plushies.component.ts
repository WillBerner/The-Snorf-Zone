import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCTS } from '../../data/product-data';

@Component({
  standalone: true,
  selector: 'plushies-page',
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './plushies.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./plushies.component.scss'],
})
export class PlushiesComponent {
  readonly products = PRODUCTS;
}
