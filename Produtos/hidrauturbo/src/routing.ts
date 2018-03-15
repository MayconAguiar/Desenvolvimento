
import { Routes, RouterModule } from '@angular/router';

import { GalleryComponent } from "./app/gallery/gallery.component";
import { ImageComponent } from "./app/image/image.component";
import { PrincipalComponent } from './app/principal/principal.component';
import { ModuleWithProviders } from '@angular/core';
import { CarrosselFotosComponent } from './app/carrossel-fotos/carrossel-fotos.component';
import { MenuComponent } from './app/menu/menu.component';
import { ServicosComponent } from './app/servicos/servicos.component';
import { EmpresaComponent } from './app/empresa/empresa.component';
import { PecasComponent } from './app/pecas/pecas.component';
import { ContatoComponent } from './app/contato/contato.component';
import { LocalizacaoComponent } from './app/localizacao/localizacao.component';

const APP_ROUTES: Routes = [
    { path: "", component: PrincipalComponent},
    { path: "gallery", component: GalleryComponent},
    { path: "image/:id", component: ImageComponent},
    { path: "carrossel", component: CarrosselFotosComponent},
    { path: "servicos", component: ServicosComponent},
    { path: "empresa", component: EmpresaComponent},
    { path: "pecas", component: PecasComponent},
    { path: "contato", component: ContatoComponent},
    { path: "localizacao", component: LocalizacaoComponent},
    // ,
    // { path: "menu", component: MenuComponent}
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);