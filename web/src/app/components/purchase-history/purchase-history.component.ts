import {
  Component, EventEmitter, Output,
  trigger, style, animate, transition, OnInit
} from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpServiceProvider } from '../../services/HttpServiceProvicer';

@Component({
  selector: 'purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css'],
  animations: [
    trigger('purchase-history', [
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

export class PurchaseHistoryComponent {
  public orders = [];
  public subs = null;
  public isCache = false;
  public date = '09-10-2017';

  constructor(private session: SessionService, private api: HttpServiceProvider) {
    this.session.isLoggedIn()
      .subscribe((resp) => {
        if (resp) {
          const user = JSON.parse(localStorage.getItem('user'));
          this.getHistory(user.token);
        } else {
          this.getHistory(null);
        }
      });
  }

  getHistory(token) {
    this.subs = this.api.getHistory(token).subscribe((response) => {
      if (response.source == 'cache') {
        this.isCache = true;
        this.date = response['updatedAt'];
      }
      this.orders = response['orders'];
    }, (err) => {
      console.log(err);
    });
  }


  hideHistory(event) {
    this.session.hideHistory();
  }

}
