import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SessionService {
    public token: string;

    private logger = new Subject<boolean>();

    constructor() {
        console.log("inicializando auth")
    }

    public checkStoredSession() {
        console.log("checking session")
        // set token if saved in local storage
        let user = JSON.parse(localStorage.getItem("user"));
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