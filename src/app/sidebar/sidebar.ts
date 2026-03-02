import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() mobileOpen = false;
  @Input() collapsed = false;

    toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
