import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  showModalLogin = false;
  isLogged = false;
  user = null;
  visibleCart = false;
  visibleHistory = false;
  cart;

  constructor(private session: SessionService) {
    //subscribe to session changes (log-in, logout)
    session.isLoggedIn()
      .subscribe((resp) => {
        this.isLogged = resp;
        if (resp) {
          this.user = JSON.parse(localStorage.getItem('user'));
        } else {
          this.user = null;
        }
      });

    //subscribe to changes of cart status
    session.isCartVisible()
      .subscribe((visibleCart) => {
        this.visibleCart = visibleCart;
    });

    session.getCart()
      .subscribe((cart) => {
        this.cart = cart;
      });
    //check if session stored in LocalStorage
    session.checkStoredSession();

    session.isHistoryVisible()
      .subscribe((visibleHistory) => {
        this.visibleHistory = visibleHistory;
    });

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

  showCart() {
    this.session.showCart();
  }

  showHistory() {
    this.session.showHistory();
  }
  closeHistory() {
    this.showModalLogin = false;
  }
}
