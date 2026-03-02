import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router:Router) {}

  login() {
    if (!this.username || !this.password) {
      this.error = "नाव आणि पासवर्ड आवश्यक आहेत.";
      return;
    }
    if (this.username === 'admin' && this.password === '0909') {
      this.error = ''
      this.router.navigate(['/dashboard']);

      return;
    }
    else {
      this.error = "चुकीचे नाव किंवा पासवर्ड";
    }
  }
}
