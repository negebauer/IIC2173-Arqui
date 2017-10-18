import {
  Component, EventEmitter, Output,
  trigger, style, animate, transition, OnInit
} from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';
import { Validations } from './validations';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [Validations],
  animations: [
    trigger('login', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.0, .0, .0)' }))
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
  error = '';

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(private session: SessionService,
              private va: Validations,
              private api: HttpServiceProvider) {}


  public validateUserInfo() {
    if (!this.va.isName(this.name)) {
      this.error = 'ingresa un nombre válido';
    } else if (!this.va.isName(this.last_name)) {
      this.error = 'ingresa un apellido válido';
    } else if (!this.va.isAddress(this.address)){
      this.error = 'ingresa una dirección válida';
    } else {
      this.error = '';
      return true;
    }
    return false;
  }

  public validateMailAndPassword() {
    if (!this.va.isMail(this.mail)) {
      this.error = 'ingresa un mail válido';
    } 
    else if (!this.va.validPassword(this.password)) {
      this.error = 'ingresa una contraseña de 4-12 caracteres';
    } 
    else {
      this.error = '';
      return true;
    }
    return false;
  }

  onChange() {
    if (this.template == 'login'){
      this.validateMailAndPassword() ?
          this.canLogin = true : this.canLogin = false;
    } else {
      this.validateMailAndPassword() && this.validateUserInfo() ?
        this.canLogin = true : this.canLogin = false;
    }
  }

  closeLogin(event) {
    this.close.emit(false);
  }

  public submitLogin() {
    this.api.logIn(this.mail, this.password)
      .subscribe((response) => {
          this.session.login(this.mail, response.token);
          console.log(response);
          this.close.emit(false);
      }, (err) => {
          this.error = 'mail o contraseña erroneas';
      });

  }

  public submitSignUp() {
    console.log('we\'re submitting signUp');
    this.api.signUp(this.name, this.last_name, this.mail, this.address, this.password)
      .subscribe((response) => {
        this.close.emit(false);
      }, (err) => {
        this.error = 'hubo un error creando su cuenta, intente más tarde';
      });
  }

  public switchTemplate() {
    if (this.template == 'login') {
      this.template = 'signup';
    } else {
      this.template = 'login';
    }
    this.onChange();
  }

}
