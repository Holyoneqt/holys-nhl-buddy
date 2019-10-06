import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppLoadingComponent } from './components/app-loading/app-loading.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { HomeComponent } from './routes/home/home.component';
import { ScoresComponent } from './routes/scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLoadingComponent,

    HomeComponent,
    ScoresComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    // App Modules
    AppMaterialModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
