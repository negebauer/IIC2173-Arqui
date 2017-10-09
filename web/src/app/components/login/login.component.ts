import {
  Component, EventEmitter, Output,
  trigger, style, animate, transition, OnInit
} from '@angular/core';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('login', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(2000)
      ]),
      transition('* => void', [
        animate(2000, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class LoginComponent {

  template = 'login';
  name: string;
  last_name: string;
  address: string;
  mail: string;
  password = '';
  canLogin = false;

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private _api: HttpServiceProvider) { }

  //regex!
  public validateMail() {
    return true;
  }

  public validateUserInfo() {
    return this.name != '' && this.last_name != '' && this.address != '';
  }

  onChange() {
    if (this.template == 'login'){
      this.password != '' && this.validateMail() ?
          this.canLogin = true : this.canLogin = false;
    } else {
      this.password != '' && this.validateMail() && this.validateUserInfo() ?
        this.canLogin = true : this.canLogin = false;
    }
  }

  closeLogin(event) {
    this.close.emit(false);
  }

  public submitLogin() {
    console.log('we\'re submitting');
    this._api.logIn(this.mail, this.password)
      .subscribe((response) => {
        console.log(response);
      }, (err) => {
        console.log(err);
      });
  }

  public submitSignUp() {
    console.log('we\'re submitting signUp');
    this._api.signUp(this.name, this.last_name, this.mail, this.address, this.password)
      .subscribe((response) => {
        console.log(response);
      }, (err) => {
        console.log(err);
      });
  }

  public switchTemplate() {
    if (this.template == 'login') {
      this.template = 'signup';
    } else {
      this.template = 'login';
    }
  }

}
