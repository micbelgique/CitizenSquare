import {Component, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'cs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  getCardQuery = gql`
    {
      user{
        id
        card{
          id
          serial
          scansCount:_scansMeta{count}
        }
      }
    }

  `;

  card: { id: string, serial: string, scansCount: { count: number } };

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.query({
      query: this.getCardQuery
    })
      .subscribe(({ data }: any) => {
        console.log('data', data);
        const { user: { card } } = data;
        if (card) {
          this.card = card;
        }
      });
  }

}
