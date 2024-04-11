import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    BlankPageComponent,
    HeaderComponent,
    //BlankPageComponent
  ],
  imports: [
    BlankPageComponent,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule, ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
