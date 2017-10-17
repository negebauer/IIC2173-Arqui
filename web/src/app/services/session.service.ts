import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionService {
    public token: string;
    private logger = new BehaviorSubject<boolean>(false);
    private cart = [];
    private visibleCart = new Subject<boolean>();

    constructor() {}

    //Cart status (visible or hide)
    public isCartVisible() {
        return this.visibleCart.asObservable();
    }
    public hideCart() {
        this.visibleCart.next(false);
    }
    public showCart() {
        this.visibleCart.next(true);
    }

    //Cart itself (list of objects)
    public getCart() {
        return Observable.of(this.cart);
    }

    public addToCart(element: object) {
        const index = this.cart.indexOf(element, 0);
        if (index == -1) {
            this.cart.push(element);
        }
    }

    public removeFromCart(element: object) {
        const index = this.cart.indexOf(element, 0);
        if (index > -1) {
           this.cart.splice(index, 1);
        }
    }

    //User Session (login status)
    public checkStoredSession() {
        // set token if saved in local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            this.logger.next(true);
        }
    }

    public isLoggedIn(): Observable<boolean> {
        return this.logger.asObservable();
    }

    public login(mail, token) {
        localStorage.setItem('user', JSON.stringify({ token: token, mail: mail }));
        this.logger.next(true);
    }

    public logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('user');
        this.logger.next(false);
    }
}
