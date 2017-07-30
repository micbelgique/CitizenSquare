import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {provideClient} from './apollo.config';
import {ApolloModule} from 'apollo-angular';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {ApiService} from './api.service';
import {HomeModule} from './home/home.module';
import {NguiMapModule} from '@ngui/map';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ApolloModule.forRoot(provideClient),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyADovK14Aj_EAvoozR-nzbfNswf173I67I' }),
    AuthModule,
    SharedModule,
    HomeModule,
    AppRouting,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
