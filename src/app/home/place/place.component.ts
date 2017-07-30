import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {getAllPlaces} from '../query';

@Component({
  selector: 'cs-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places: { id: string, name: string, lat: number, lon: number, isShop: boolean }[] = [];

  marker = {
    display: true,
    name: null
  };


  constructor(private apollo: Apollo) {
  }


  ngOnInit() {
    this.apollo.query({
      query: getAllPlaces,
    })
      .subscribe(({ data }) => {
        console.log('ddd', data);
        const { allPlaces }: any = data;
        this.places = allPlaces;
      });

  }

  clicked({ target: marker }, index) {
    console.log('marker', marker);
    this.marker.name = this.places[index].name;

    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }


}
