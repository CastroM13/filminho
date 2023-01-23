import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { TrackerComponent } from './tracker/tracker.component';
import { DetailComponent } from './detail/detail.component';
import { ToTitleCasePipe } from './to-title-case.pipe';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackerComponent,
    DetailComponent,
    ToTitleCasePipe,
    EditComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
