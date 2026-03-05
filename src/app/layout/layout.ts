import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
})
export class Layout implements OnInit {

  today = new Date();

  isMobileOpen = false;
  isCollapsed = false;
  isMobileView = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobileView) {
          this.isMobileOpen = false;
        }
      });
  }

  ngOnInit() {
    this.isMobileView = window.innerWidth <= 768;

    // Load saved collapse state
    const savedState = localStorage.getItem('sidebarCollapsed');
    this.isCollapsed = savedState === 'true';
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 768;

    if (!this.isMobileView) {
      this.isMobileOpen = false;
    }
  }

  toggleSidebar() {
    if (this.isMobileView) {
      this.isMobileOpen = !this.isMobileOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;

      // Save collapse state
      localStorage.setItem('sidebarCollapsed', this.isCollapsed.toString());
    }
  }

  closeMobile() {
    if (this.isMobileView) {
      this.isMobileOpen = false;
    }
  }
}