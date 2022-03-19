import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FullScreenComponent} from "./mapas/pages/full-screen/full-screen.component";
import {ZoomRangeComponent} from "./mapas/pages/zoom-range/zoom-range.component";
import {MarcadoresComponent} from "./mapas/pages/marcadores/marcadores.component";
import {PropiedadesComponent} from "./mapas/pages/propiedades/propiedades.component";

const routes: Routes = [
  {
    path: 'mapas',
    loadChildren: () => import('./mapas/mapas.module').then( m => m.MapasModule )
  },
  {
    path: '**', redirectTo: 'mapas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
