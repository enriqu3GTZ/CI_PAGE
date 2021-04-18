import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { OxxoComponent } from './oxxo/oxxo.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, canActivate:[AuthGuard]},
  {path: 'nosotros', component: NosotrosComponent , canActivate:[AuthGuard]},
  {path: 'contacto', component: ContactoComponent, canActivate:[AuthGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate:[AuthGuard]},
  {path: 'oxxo', component: OxxoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
