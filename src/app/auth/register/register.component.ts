import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'cs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  f: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private api: ApiService) {
  }

  ngOnInit() {
    this.f = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      serial: [null, [Validators.required]],
      password: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]
      ],
    });
  }

  register(credentials: { email: string, password: string, serial: string }) {
    const { serial } = credentials;
    delete credentials.serial;

    this.api.getCardBySerial(serial)
      .switchMap((cardId) => {
        return this.auth.register(credentials, cardId)
      })
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }


  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
