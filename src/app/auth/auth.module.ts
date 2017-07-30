import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './auth.guard';
import {RegisterComponent} from './register/register.component';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [AuthService, AuthGuard],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {
}
