import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServerService } from './services/server.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  private readonly serverService = inject(ServerService);

  ngOnInit() {
    // Warm up the backend server on first page load
    // This fires as soon as the user lands on the site
    this.serverService.warmUpServer();
  }
}