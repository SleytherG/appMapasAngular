import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface MarcadorColor {
  color: string;
  marcador?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -70.12588491394685, -15.502483290872144 ];
  nuevoMarcador!: mapboxgl.Marker;

  // Arreglo de Marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );
  }

  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));
    console.log(color);

    this.nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat( this.center )
      .addTo( this.mapa );

    this.marcadores.push({
      color: color,
      marcador: this.nuevoMarcador
    });
    console.log(this.marcadores);

    this.guardarMarcadoresLocalStorage();

    this.nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })

  }

  irMarcador({ color, marcador }: MarcadorColor) {
    this.mapa.flyTo({
      center: marcador?.getLngLat()
    })

  }

  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) );
  }

  leerLocalStorage() {
    if ( !localStorage.getItem('marcadores') ) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')! );

    console.log(lngLatArr);

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat( m.centro! )
        .addTo( this.mapa );

      this.marcadores.push({
        marcador: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })
    })

  }

  borrarMarcador( i: number) {
    this.marcadores[i].marcador?.remove();
    this.marcadores.splice( i , 1);
    this.guardarMarcadoresLocalStorage();
  }

}
