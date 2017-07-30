import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {CardComponent} from './card/card.component';
import {ProfilComponent} from './profil/profil.component';
import {HistoriqueComponent} from './historique/historique.component';
import {ParametreComponent} from './parametre/parametre.component';
import {AuthGuard} from '../auth/auth.guard';
import {PlaceComponent} from './place/place.component';

const routes: Route[] = [
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'profil',
          component: ProfilComponent,
          pathMatch: 'full'
        },
        {
          path: 'historique',
          component: HistoriqueComponent,
          pathMatch: 'full'
        },
        {
          path: 'place',
          component: PlaceComponent,
          pathMatch: 'full'
        },
        {
          path: 'card',
          component: CardComponent,
          pathMatch: 'full'
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'card'
        },
      ]
    },
  ]
;

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class HomeRouting {
}
