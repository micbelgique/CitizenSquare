import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

const cardSerialQuery = gql`
  query getCardBySerial ($serial:String!){
    Card(serial:$serial){
      id
    }
  }
`;

@Injectable()
export class ApiService {

  constructor(private apollo: Apollo) {
  }

  getCardBySerial(serial: string) {
    return this.apollo.watchQuery({
      query: cardSerialQuery,
      variables: {
        serial
      }
    }).map(({ data }) => {
      const { Card }: any = data;
      return Card.id;
    });
  }
}
