import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Full Screen Component');

    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ -70.12588491394685 , -15.502483290872144 ],
      zoom: 18
    });
  }

}
