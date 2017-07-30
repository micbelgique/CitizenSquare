import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {getCardAndScansAndPlaceOfUserConnected} from '../query';

@Component({
  selector: 'cs-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  scans: {
    id: string,
    place: { name: string },
    value: string,
    createdAt: string
  }[] = [];

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: getCardAndScansAndPlaceOfUserConnected,
      fetchPolicy: 'network-only',
      pollInterval: 1000
    })
      .subscribe(({ data }: any) => {
        const { user: { card: { scans } } } = data;
        if (scans) {
          this.scans = scans;
        }
      });
  }

}
