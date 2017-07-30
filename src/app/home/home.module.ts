import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {HomeComponent} from './home.component';
import {ProfilComponent} from './profil/profil.component';
import {HomeRouting} from './home.routing';
import {CardComponent} from './card/card.component';
import {HistoriqueComponent} from './historique/historique.component';
import {PlaceComponent} from './place/place.component';
import {NguiMapModule} from '@ngui/map';

@NgModule({
  imports: [
    SharedModule,
    HomeRouting,
    NguiMapModule
  ],
  declarations: [HomeComponent, ProfilComponent, CardComponent, HistoriqueComponent, PlaceComponent,],
  exports: [HomeComponent, ProfilComponent, CardComponent, HistoriqueComponent,],
})
export class HomeModule {
}
