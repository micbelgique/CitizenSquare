import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {getCardAndScansOfUserConnected} from './query';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  total = 0;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery({
      query: getCardAndScansOfUserConnected,
      pollInterval: 1000
    })
      .subscribe(({ data }: any) => {

        if (data.user) {
          this.total = data.user.card.scans.reduce((sum, next) => {
            return sum + next.value;
          }, 0);
        }
      });
  }

}
