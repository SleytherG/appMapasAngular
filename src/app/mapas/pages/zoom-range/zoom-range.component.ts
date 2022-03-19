import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        position: fixed;
        z-index: 999;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [ -70.12588491394685, -15.502483290872144 ];


  constructor() { }

  ngOnDestroy() {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});

  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //Listener para escuchar el zoom
    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });

    // Listener para escuchar el zoom si es mayor a 18
    this.mapa.on('zoomend', (event) => {
      if ( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo(18);
      }
    })

    //Listener para escuchar el movimiento con el mouse
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ];

    })

  }

  zoomIn() {

    this.mapa.zoomIn();
  }

  zoomOut() {
    this.zoomLevel = this.mapa.getZoom();
    this.mapa.zoomOut();
  }

  zoomCambio( valor: string) {
    this.mapa.zoomTo( Number(valor) );
  }

}
