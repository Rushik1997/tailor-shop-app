import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard  implements OnInit {

  message = '';

  constructor(private router: Router,
              private api: ApiService
  ) {}

  ngOnInit(){
    this.api.testBackend().subscribe({
      next: (res:any)=>{
        this.message = res.message;
        console.log('Backend response:', res);
      },
      error: (err)=>{
        console.log('Backend error:', err);
      }
    })
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/']);
  }

  goTo(path: string) {
    this.router.navigate(['/' + path]);
  }
}
