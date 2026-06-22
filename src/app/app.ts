import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServerService } from './services/server.service';

@Component({
  standalone: true,
  selector: 'home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class HomeComponent implements OnInit {
  private readonly serverService = inject(ServerService);

  ngOnInit() {
    // Warm up the backend server on first page load
    // This fires as soon as the user lands on the site
    this.serverService.warmUpServer();
  }
}