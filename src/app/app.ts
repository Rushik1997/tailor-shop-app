import { Component} from '@angular/core';
import { Login } from './login/login';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
