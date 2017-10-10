import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'app';
  showModalLogin = false;
  isLogged=false;
  user = null;

  constructor(private session: SessionService) {
    session.isLoggedIn()
      .subscribe((resp) => {
        this.isLogged = resp;
        if (resp) {
          this.user = JSON.parse(localStorage.getItem("user"));
        } else {
          this.user = null;
        }
      })
    session.checkStoredSession();

  }

  showLogin() {
  	this.showModalLogin = true;
  }
  closeLogin() {
  	this.showModalLogin = false;
  }
  logout() {
    this.session.logout();
  }
}
