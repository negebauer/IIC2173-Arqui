import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showModalLogin = false;
  constructor() {

  }

  showLogin() {
  	this.showModalLogin = true;
  }
  closeLogin() {
  	this.showModalLogin = false;
  }
}
