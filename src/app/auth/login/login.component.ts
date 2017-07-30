import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  f: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.f = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]
      ],
    });
  }

  login(credentials: { email: string, password: string }) {
    this.auth.login(credentials)
      .subscribe(() => {
        this.router.navigate(['/']);
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
