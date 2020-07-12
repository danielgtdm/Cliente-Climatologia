import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule,
  NbSpinnerModule,
  NbTreeGridModule,
  NbButtonModule
 } from '@nebular/theme';
 
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartsModule } from 'ng2-charts';

import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';

import { ConsultandoComponent } from 'src/app/pages/dialogs/consultando/consultando.component';
import { RegistrosNoEncontradosComponent } from './pages/dialogs/registros-no-encontrados/registros-no-encontrados.component';
import { EntrenandoComponent } from './pages/dialogs/entrenando/entrenando.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsultandoComponent,
    RegistrosNoEncontradosComponent,
    EntrenandoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbEvaIconsModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    NbCardModule,
    NbSpinnerModule,
    NbTreeGridModule,
    NbButtonModule
  ],
  entryComponents: [
    ConsultandoComponent,
    RegistrosNoEncontradosComponent,
    EntrenandoComponent
  ],
  providers: [],
  bootstrap: [AppComponent] 
})
export class AppModule { }
