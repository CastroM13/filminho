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
import { SearchFilterPipe } from './search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackerComponent,
    DetailComponent,
    ToTitleCasePipe,
    SearchFilterPipe,
    EditComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule, FormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
